import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import { PosterSession } from '@/lib/models/PosterSession';
import { TEMPLATES } from '@/data/templates';

export async function POST(request: Request) {
  try {
    const { name, city, templateId } = await request.json();

    if (!name || !city || !templateId) {
      return NextResponse.json(
        { error: 'Missing required fields (name, city, templateId)' },
        { status: 400 }
      );
    }

    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) {
      return NextResponse.json({ error: 'Invalid template ID' }, { status: 400 });
    }

    // Generate unique poster ID and secure share token
    const posterId = uuidv4();
    const shareActionToken = crypto.randomBytes(32).toString('hex');

    // Connect to DB and save pending PosterSession
    await dbConnect();
    const ttlHours = parseInt(process.env.POSTER_SESSION_TTL_HOURS || '24', 10);
    const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);
    const shareThreshold = parseInt(process.env.POSTER_SHARE_THRESHOLD || '10', 10);

    await PosterSession.create({
      posterId,
      templateId,
      name: name.trim(),
      city: city.trim(),
      status: 'pending_payment',
      aiGenerationStatus: 'pending',
      shareThreshold,
      shareActionToken,
      expiresAt,
    });

    return NextResponse.json({
      success: true,
      posterId,
    });
  } catch (error: any) {
    console.error('Error initializing poster session:', error);
    return NextResponse.json(
      { error: 'Failed to initialize session', details: error.message },
      { status: 500 }
    );
  }
}
