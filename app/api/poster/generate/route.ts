import { NextResponse } from 'next/server';
import { generatePoster } from '@/lib/posterEngine';
import { generateOpenRouterImage, OpenRouterProductionConfig } from '@/lib/openRouterProvider';
import { TEMPLATES } from '@/data/templates';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import { PosterSession } from '@/lib/models/PosterSession';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const city = formData.get('city') as string;
    const templateId = formData.get('templateId') as string;
    const photo = formData.get('photo') as File;

    if (!name || !templateId || !photo) {
      return NextResponse.json(
        { error: 'Missing required fields (name, templateId, photo)' },
        { status: 400 }
      );
    }

    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) {
      throw new Error("Invalid template ID");
    }

    // Convert user photo File to base64 for the API
    const photoBuffer = Buffer.from(await photo.arrayBuffer());
    const referenceImageUrl = `data:${photo.type};base64,${photoBuffer.toString('base64')}`;

    // Read the reference poster as base64
    const bgPath = path.join(process.cwd(), 'public', template.thumbnailImage!);
    const bgBuffer = await fs.readFile(bgPath);
    const bgMime = template.thumbnailImage!.endsWith('jpg') || template.thumbnailImage!.endsWith('jpeg') ? 'image/jpeg' : 'image/png';
    const imageUrl = `data:${bgMime};base64,${bgBuffer.toString('base64')}`;

    const prompt = `Create the final personalized version of the provided Classic India Independence Day poster.

The Classic India poster is the PRIMARY visual and design reference.

Preserve its original composition, layout, person placement, pose, clothing style, India Gate, Ashoka Chakra, tricolor brush strokes, Indian flags, crowd silhouettes, typography hierarchy and overall patriotic aesthetic.

Replace the identity of the original person with the person shown in the uploaded user photograph.

IMPORTANT: The uploaded user photograph is an IDENTITY REFERENCE ONLY.

Use the user's photograph only to preserve the person's recognizable facial identity, including facial structure, eyes, nose, mouth, jawline, beard/facial hair, hairstyle where compatible, and skin tone.

DO NOT copy the user's clothing.

DO NOT copy the user's shirt, T-shirt, jacket, suit, hoodie, accessories or other clothing into the final poster.

The final person MUST wear the same type of clean white traditional Indian kurta shown in the Classic India reference poster.

The clothing must come from the Classic India template, not from the user photograph.

Maintain the original pose, body presentation, scale and position of the Classic India person as closely as possible.

The result should look as if the original person in the approved Classic India poster has been replaced with the visitor's real facial identity while everything else remains faithful to the original template.

Render the final personalized text exactly:

HAPPY INDEPENDENCE DAY
2026

${name.toUpperCase()}

${city.toUpperCase()}

freedom2026.in

Match the original typography style, placement, scale, alignment and hierarchy.

Do not create a new poster design.
Do not redesign the composition.
Do not transfer the user's clothing.
Do not transfer the user's accessories.
Do not add unrelated objects.
Do not add extra text.
Do not duplicate text.

The final result must be a faithful personalization of the original Classic India poster.`;

    const aiConfig: OpenRouterProductionConfig = {
      model: 'openai/gpt-image-2',
      prompt,
      referenceImageBase64: imageUrl,
      userImageBase64: referenceImageUrl
    };

    console.log(`Calling OpenRouter GPT Image 2 for full poster generation for ${name}...`);
    const aiResult = await generateOpenRouterImage(aiConfig);
    
    if (aiResult.error || !aiResult.imageBuffer) {
      throw new Error(`OpenRouter API failed: ${aiResult.error}`);
    }

    console.log(`AI Gen successful. Time: ${aiResult.generationTimeMs}ms`);

    // Ensure output is exactly 1080x1350 (Full Quality)
    const normalizedBuffer = await sharp(aiResult.imageBuffer)
      .resize(1080, 1350, { fit: 'cover' })
      .png()
      .toBuffer();

    // 1. Generate unique poster ID and secure share token
    const posterId = uuidv4();
    const shareActionToken = crypto.randomBytes(32).toString('hex');

    // 2. Save full-res poster to local storage (outside public access)
    const posterStorageDir = path.join(process.cwd(), 'data', 'posters');
    // Ensure directory exists (fallback)
    await fs.mkdir(posterStorageDir, { recursive: true }).catch(() => {});
    const filePath = path.join(posterStorageDir, `${posterId}.png`);
    await fs.writeFile(filePath, normalizedBuffer);

    // 3. Connect to DB and save PosterSession
    await dbConnect();
    const ttlHours = parseInt(process.env.POSTER_SESSION_TTL_HOURS || '24', 10);
    const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);
    const shareThreshold = parseInt(process.env.POSTER_SHARE_THRESHOLD || '10', 10);
    
    await PosterSession.create({
      posterId,
      templateId,
      name,
      city,
      status: 'generated',
      shareThreshold,
      shareActionToken,
      expiresAt,
    });

    // 4. Create a lower-resolution preview for the frontend
    const previewBuffer = await sharp(normalizedBuffer)
      .resize(540, 675, { fit: 'cover' }) // Half resolution for preview
      .jpeg({ quality: 75 })
      .toBuffer();
    
    const previewBase64 = `data:image/jpeg;base64,${previewBuffer.toString('base64')}`;

    return NextResponse.json({ 
      success: true, 
      posterId,
      posterUrl: previewBase64, // Provide preview URL to not break existing UI initially
      shareActionToken
    });
  } catch (error: any) {
    console.error('Error generating poster:', error);
    return NextResponse.json(
      { error: 'Failed to generate poster', details: error.message },
      { status: 500 }
    );
  }
}
