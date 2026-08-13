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

export const maxDuration = 60; // Allow up to 60 seconds for AI poster generation
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const posterId = formData.get('posterId') as string;
    const razorpay_payment_id = formData.get('razorpay_payment_id') as string;
    const razorpay_order_id = formData.get('razorpay_order_id') as string;
    const razorpay_signature = formData.get('razorpay_signature') as string;
    
    // We get these from the client, but we will rely on DB for name/city/templateId if we wanted.
    // To minimize changes, we still accept them and use them.
    const name = formData.get('name') as string;
    const city = formData.get('city') as string;
    const templateId = formData.get('templateId') as string;
    const photo = formData.get('photo') as File;

    const missingFields: string[] = [];
    if (!posterId) missingFields.push('posterId');
    if (!razorpay_payment_id) missingFields.push('razorpay_payment_id');
    if (!razorpay_order_id) missingFields.push('razorpay_order_id');
    if (!razorpay_signature) missingFields.push('razorpay_signature');
    if (!name) missingFields.push('name');
    if (!templateId) missingFields.push('templateId');
    if (!photo || !(photo instanceof File) || photo.size === 0) missingFields.push('photo');

    if (missingFields.length > 0) {
      console.error(`Poster generation failed due to missing fields: ${missingFields.join(', ')}`);
      return NextResponse.json(
        { error: `Missing required fields or payment details: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // 1. Verify Payment Security
    await dbConnect();
    const session = await PosterSession.findOne({ posterId });
    if (!session) {
      return NextResponse.json({ error: 'Poster session not found' }, { status: 404 });
    }

    if (session.aiGenerationStatus === 'success') {
      return NextResponse.json({ error: 'Poster has already been generated for this session.' }, { status: 400 });
    }

    if (session.status !== 'pending_payment' && session.status !== 'unlocked') {
      return NextResponse.json({ error: 'Session already consumed or invalid state' }, { status: 400 });
    }

    if (session.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ error: 'Order ID mismatch' }, { status: 400 });
    }

    // Verify signature
    const text = session.razorpayOrderId + '|' + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex');

    const isAuthentic = crypto.timingSafeEqual(
      Buffer.from(generated_signature),
      Buffer.from(razorpay_signature)
    );

    if (!isAuthentic) {
      return NextResponse.json({ error: 'Payment signature verification failed' }, { status: 400 });
    }

    // NOTE: In production, we should fetch Razorpay API to verify status === 'captured' here.
    // Assuming signature matches our order ID and amount is predefined, it's secure enough for now.

    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) {
      return NextResponse.json({ error: 'Invalid template ID' }, { status: 400 });
    }

    // Convert user photo File to base64 for the API
    const photoBuffer = Buffer.from(await photo.arrayBuffer());
    const referenceImageUrl = `data:${photo.type};base64,${photoBuffer.toString('base64')}`;

    // Read the reference poster as base64
    const bgPath = path.join(process.cwd(), 'public', template.thumbnailImage!);
    const bgBuffer = await fs.readFile(bgPath);
    const bgMime = template.thumbnailImage!.endsWith('jpg') || template.thumbnailImage!.endsWith('jpeg') ? 'image/jpeg' : 'image/png';
    const imageUrl = `data:${bgMime};base64,${bgBuffer.toString('base64')}`;

    let prompt = "";

    if (template.id === 'modern-india') {
      prompt = `The supplied Modern India image is the MASTER reference for the complete poster.

Recreate the poster faithfully while keeping the REFERENCE PERSON'S BODY completely intact.

CRITICAL IDENTITY RULE:

REFERENCE PERSON = BODY + POSE + POSTURE + BODY LANGUAGE + CLOTHING + ACCESSORIES + COMPOSITION

USER PHOTO = FACIAL IDENTITY ONLY

DO NOT replace the reference person's body with the user's body.

DO NOT copy the user's body shape, shoulders, posture, body language, pose, clothing or accessories.

ONLY replace/adapt the reference person's FACE with the recognizable facial identity of the female user from the uploaded photo.

The final result must look like the ORIGINAL FEMALE PERSON IN THE MODERN INDIA REFERENCE, with only her facial identity replaced by the uploaded user's facial identity.

PRESERVE THE REFERENCE PERSON EXACTLY AS MUCH AS POSSIBLE:

- body position
- body proportions
- shoulders
- posture
- pose
- body language
- clothing
- clothing color
- clothing design
- saffron/orange stole
- accessories
- framing
- camera angle
- subject scale
- lighting

The reference person's white patriotic outfit and saffron/orange stole MUST remain unchanged.

The user's uploaded clothing MUST NOT influence the final clothing.

USER IDENTITY — FACE ONLY:

Use the uploaded female user's photo only as the facial identity reference.

Preserve:
- facial identity
- face structure
- eyes
- nose
- mouth
- jawline
- skin tone
- recognizable facial features

Do NOT copy the user's body.

Do NOT copy the user's clothing.

Do NOT copy the user's pose.

Do NOT copy the user's body language.

Do NOT copy the user's accessories.

Maintain natural:
- face-to-body proportions
- neck transition
- head angle
- facial perspective
- skin tone consistency
- lighting
- shadows

The face must look naturally photographed as part of the reference person's body, NOT like a pasted face or artificial face swap.

The final person MUST remain female.

BACKGROUND:

Preserve the Modern India reference background as closely as possible.

Especially preserve:
- India Gate on the left
- Red Fort on the right
- patriotic landscape
- sky
- birds
- greenery
- orange, white and green brush strokes
- Ashoka Chakra
- Indian flags
- bottom decorative elements

Do not replace landmarks.
Do not introduce unrelated monuments.
Do not redesign the composition.

TEXT:

Render the complete final personalized poster INCLUDING TYPOGRAPHY.

Top text:

HAPPY
INDEPENDENCE DAY
2026

Bottom text:

15 AUGUST 2026
${name.toUpperCase()} - ${city.toUpperCase()}
Proud to be an Indian

IMPORTANT TYPOGRAPHY RULE:

Create a clearly defined bottom safe area.

Move the entire bottom text block upward enough so that there is comfortable space below the last line.

Do NOT allow any text to touch or cross the bottom edge.

Do NOT crop, clip or partially hide any text.

Keep the text hierarchy and visual style consistent with the Modern India reference.

Do NOT invent text.

Do NOT change the user's name.

Do NOT change the user's city.

Do NOT duplicate text.

Do NOT generate gibberish text.

Do NOT add random slogans, logos or watermarks.

The final poster must be premium, photorealistic, cinematic and professionally composed.

Target output: 1080x1350, 4:5 aspect ratio.

MOST IMPORTANT FINAL RULE:

KEEP THE REFERENCE PERSON'S BODY, CLOTHING, POSE AND BODY LANGUAGE.

CHANGE ONLY THE FACIAL IDENTITY TO MATCH THE UPLOADED FEMALE USER.

The uploaded user photo is a FACE/IDENTITY REFERENCE, NOT a full-body or clothing reference.`;
    } else if (template.id === 'business') {
      prompt = `The supplied Business reference image is the MASTER REFERENCE.

This is a MALE-ONLY business template.

CRITICAL IDENTITY RULE:

REFERENCE IMAGE = complete person presentation
USER PHOTO = FACE / IDENTITY ONLY

The final person MUST be male.

Use the uploaded user's photo ONLY to transfer the user's recognizable facial identity.

Preserve from the Business reference:
- Male gender presentation
- Professional business body
- Suit
- Shirt
- Tie
- Folded-arm pose
- Body posture
- Body proportions
- Professional appearance
- Overall lighting
- Head/body positioning
- Reference hairstyle where compatible with natural face integration
- Complete composition

DO NOT copy from the user's photo:
- Clothing
- T-shirt
- Shirt
- Kurta
- Jacket
- Suit
- Tie
- Accessories
- Body
- Body posture
- Body language
- Pose

The user's uploaded clothing and body presentation MUST NEVER override the Business reference.

The result should look like the ORIGINAL BUSINESS POSTER PERSON, but with the uploaded male user's real facial identity naturally integrated into that person.

The face must NOT look pasted or artificially face-swapped.

Maintain:
- Natural facial proportions
- Skin tone consistency
- Lighting consistency
- Facial shadows
- Neck transition
- Head angle
- Perspective
- Photorealistic integration

COMPOSITION

Treat the supplied Business poster as the MASTER visual reference.

Preserve the composition as closely as possible, including:
- Large Indian flag
- India Gate
- Indian monuments
- Tricolor brush strokes
- Birds
- Patriotic background
- Top patriotic quote
- "HAPPY INDEPENDENCE DAY"
- "2026"
- "15TH AUGUST 2026"
- "PROUD TO BE AN INDIAN"
- Professional male subject
- Right-side business/value statements
- Bottom monument silhouette
- Bottom business/value section
- Overall premium corporate Independence Day aesthetic

DO NOT redesign the poster.
DO NOT create a different business poster.
DO NOT replace the reference composition with a generic corporate design.

TEXT

Preserve the reference typography, hierarchy, placement and visual style.
The Business template should remain a premium corporate Independence Day creative.

Do not invent random text.
Do not duplicate text.
Do not introduce unrelated text.

Text to integrate:
${name.toUpperCase()}
${city.toUpperCase()}

FINAL QUALITY

The final output must be:
- Premium
- Photorealistic
- Corporate
- Patriotic
- Professionally composed
- Consistent with the supplied Business reference
- 4:5 aspect ratio
- High resolution

CRITICAL RULE:
REFERENCE = BODY + CLOTHING + POSE + COMPOSITION
USER PHOTO = FACE / IDENTITY ONLY

This is a MALE-ONLY template.
Do not allow the user's uploaded clothing, body, pose or gender presentation to change the reference person.
Only the facial identity should come from the uploaded male user.`;
    } else if (template.id === 'india-map') {
      prompt = `The supplied India Map reference image is an APPROVED COMPLETE POSTER DESIGN.

This is a TEXT-PERSONALIZED poster only.
Do NOT use the uploaded user photo to generate a person.
Do NOT generate a new person.
Do NOT recreate a user's body or face.

Treat the reference image as a fixed master composition, NOT as inspiration for creating a new design.

MASTER COMPOSITION

Preserve the reference composition as closely as possible:
- Large India-shaped map as the primary central visual
- Saffron/white/green India map treatment
- India Gate integrated inside the map
- Ashoka Chakra
- "PROUD TO BE AN INDIAN" typography inside the map
- Indian flag in the lower-right area
- Person holding the Indian flag from behind
- Crowd silhouettes at the bottom
- Multiple Indian landmarks
- Tricolor brush strokes
- Patriotic sky
- Birds
- Overall warm cinematic lighting
- Existing visual hierarchy
- Existing typography hierarchy
- Existing positioning and scale of major elements

DO NOT redesign the poster.
DO NOT create a generic India Map poster.
DO NOT replace the reference composition with a different AI-generated composition.

The final result should look like the supplied reference image with only the required personalization applied.

COMPOSITION LOCK

Do NOT:
- Move the India map
- Change the map shape
- Remove India Gate
- Move the Ashoka Chakra
- Change the flag position
- Change the flag-holding person's position
- Change the crowd
- Remove landmarks
- Add unrelated monuments
- Change the tricolor brush strokes
- Change the overall lighting
- Zoom into any single object
- Crop important elements
- Recompose the poster

Keep the complete poster composition visible.

DYNAMIC TEXT

Preserve the existing reference text and typography style.

Personalize the designated identity area using ONLY the following text:

${name.toUpperCase()}
${city.toUpperCase()}

Do not invent names.
Do not change spelling.
Do not add random text.
Do not duplicate text.
Do not remove existing patriotic text.

Typography should remain visually consistent with the reference.

IMPORTANT AI INSTRUCTION

This is NOT a full creative redesign request.
Think of the task as: "Personalize an already finished India Map Independence Day poster."
NOT: "Create a new Independence Day poster featuring an India map."

The reference image should account for approximately 95% of the final visual composition.
Only the approved dynamic text should change.

OUTPUT

Maintain the same premium cinematic patriotic visual quality as the supplied reference.
Output aspect ratio: 4:5.
The final result must be clean, premium, patriotic and production-ready.`;
    } else if (template.id === 'portrait') {
      prompt = `The supplied Portrait reference image is the MASTER REFERENCE.

This is a FEMALE-ONLY Independence Day Portrait template.

The supplied Portrait image is the complete approved master design.
Treat the reference as a FIXED MASTER TEMPLATE, not as inspiration for creating a new poster.

IDENTITY RULE

REFERENCE IMAGE = BODY + CLOTHING + POSE + FLAG + COMPOSITION
USER PHOTO = FACE / IDENTITY ONLY

The final person MUST be female.
Use the uploaded user's photo ONLY to preserve and transfer her recognizable facial identity.

Preserve from the Portrait reference:
- Female body presentation
- White outfit
- Orange/saffron dupatta
- Hairstyle where compatible with natural face integration
- Exact pose
- Hand position
- Indian flag position
- Body proportions
- Subject scale
- Subject placement
- Lighting
- Overall composition

DO NOT copy from the user's photo:
- Clothing
- Shirt
- T-shirt
- Saree
- Kurta
- Jacket
- Accessories
- Body
- Body posture
- Body language
- Pose
- Background

The user's uploaded clothing MUST NOT override the reference clothing.
The user's body MUST NOT override the reference body.
The user's pose MUST NOT override the reference pose.
Only the facial identity should come from the uploaded user photo.

FACE INTEGRATION

Preserve the user's:
- Facial identity
- Face structure
- Eyes
- Nose
- Mouth
- Jawline
- Natural skin characteristics
- Recognizable facial features

Naturally integrate the user's face into the reference female subject.

Maintain:
- Correct face-to-body proportions
- Natural neck transition
- Correct head angle
- Correct perspective
- Matching lighting
- Matching shadows
- Consistent skin tone
- Photorealistic facial integration

The face must NOT look pasted, artificial, distorted or like an obvious face swap.

COMPOSITION LOCK

Preserve the complete Portrait reference composition.

Keep unchanged:
- Top orange/white/green brush strokes
- HAPPY
- INDEPENDENCE DAY
- 2026
- Doves/birds
- 15 AUGUST 2026
- PROUD TO BE AN INDIAN
- India Gate
- Red Fort
- Female subject
- Indian flag in her hand
- Saffron dupatta
- Ashoka Chakra
- Tricolor brush strokes around the subject
- Bottom crowd silhouettes
- Indian flags held by the crowd
- Overall lighting
- Background
- Visual hierarchy
- Typography hierarchy

DO NOT:
- Redesign the poster
- Create a new composition
- Move the woman
- Enlarge the woman
- Change her pose
- Change her clothing
- Move the flag
- Remove the landmarks
- Add unrelated objects
- Change the background
- Zoom into the face
- Crop important elements

The final result should look like the ORIGINAL Portrait reference poster with the uploaded female user's facial identity naturally integrated.

TEXT

Do NOT add the user's name.
Do NOT add the user's city.
Do NOT add any additional personalized text.

The reference text must remain exactly as part of the poster:

HAPPY
INDEPENDENCE DAY
2026

15 AUGUST 2026

Proud to be an Indian

Preserve the exact wording, spelling, typography hierarchy, placement and visual style of the reference.
Do not invent text.
Do not duplicate text.
Do not add random text.

MOST IMPORTANT RULE

This is NOT a request to create a new Independence Day portrait.
This is an identity personalization task.

Think:
REFERENCE PORTRAIT
+
USER'S FEMALE FACIAL IDENTITY
=
FINAL PORTRAIT

The reference design should account for approximately 95% of the final visual result.
The user's photo should primarily affect ONLY the facial identity.

OUTPUT

Maintain the same premium, photorealistic, cinematic patriotic aesthetic as the supplied reference.
Output: 4:5 aspect ratio.`;
    } else if (template.id === 'bengali') {
      prompt = `The supplied Bengali Independence Day poster is the approved MASTER DESIGN.
Treat the reference as a fixed finished poster, not as inspiration for creating a different Bengali poster.

This is a FEMALE-ONLY Bengali Independence Day template.

IDENTITY RULE

REFERENCE IMAGE = BODY + CLOTHING + POSE + COMPOSITION
USER PHOTO = FACE / IDENTITY ONLY

The final person MUST be female.
Use the uploaded user's photo ONLY for facial identity.

Preserve from the Bengali reference:
- Female body presentation
- White traditional outfit
- Orange/saffron dupatta
- Hairstyle where compatible
- Body proportions
- Pose
- Posture
- Hand/body presentation
- Subject position
- Subject scale
- Lighting
- Overall composition

DO NOT copy from the user's uploaded photo:
- Clothing
- Saree
- T-shirt
- Shirt
- Kurta
- Jacket
- Accessories
- Body
- Body posture
- Body language
- Pose

The user's clothing must NEVER override the reference clothing.
Only the user's recognizable facial identity should be transferred.

FACE INTEGRATION

Preserve the user's:
- Facial identity
- Face structure
- Eyes
- Nose
- Mouth
- Jawline
- Natural skin characteristics
- Recognizable facial features

Naturally integrate the user's face into the Bengali reference person.

Maintain:
- Natural face-to-body proportions
- Correct head angle
- Correct perspective
- Natural neck transition
- Matching lighting
- Matching shadows
- Consistent skin tone
- Photorealistic integration

The result must look like the original Bengali poster person with the user's real facial identity naturally integrated.
The face must NOT look pasted, artificial or distorted.

COMPOSITION LOCK

Preserve the complete Bengali reference composition.

Keep unchanged:
- Top saffron/white/green brush strokes
- "গৌরব আমাদের, ঐক্য আমাদের শক্তি"
- "স্বাধীনতা দিবস"
- "২০২৬"
- Indian flag and flagpole
- Birds
- India Gate
- Red Fort
- Female subject
- Orange/saffron dupatta
- Tricolor face paint
- Tricolor brush strokes
- Ashoka Chakra
- Bottom five Bengali sections
- Crowd silhouettes
- Indian flags
- Bottom Bengali slogan
- Overall patriotic background
- Lighting
- Visual hierarchy
- Typography hierarchy

DO NOT redesign the poster.
DO NOT create a different Bengali poster.
DO NOT move the woman.
DO NOT enlarge or shrink the woman unnecessarily.
DO NOT move the flag.
DO NOT replace the landmarks.
DO NOT remove existing elements.
DO NOT add unrelated objects.
DO NOT change the overall composition.

BENGALI TYPOGRAPHY

The Bengali typography is an important part of the master design.
Preserve the Bengali text accurately.

The required reference text is:

গৌরব আমাদের, ঐক্য আমাদের শক্তি

স্বাধীনতা দিবস

২০২৬

১৫ আগস্ট ২০২৬

গর্বিত ভারত, উজ্জ্বল ভবিষ্যৎ

এক দেশ
এক মানুষ
এক গর্ব
এক স্বপ্ন
এক ভবিষ্যৎ

চলো এগিয়ে যাই, দেশ গড়ি, ভবিষ্যৎ গড়ি

IMPORTANT:
The Bengali text must be rendered in correct Bengali script.
Do NOT translate it into English or Hindi.
Do NOT use random Bengali words.
Do NOT alter the spelling.
Do NOT duplicate text.
Do NOT add random text.
Maintain the reference typography style, hierarchy, placement and visual treatment.

PERSONALIZATION

Do NOT add the user's name.
Do NOT add the user's city.
Do NOT add additional personalized text.

The Bengali reference itself is the complete finished design.
The only personalization is the user's facial identity.

MOST IMPORTANT RULE

This is an IDENTITY PERSONALIZATION task, NOT a redesign task.

Think:
BENGALI MASTER POSTER
+
USER'S FEMALE FACIAL IDENTITY
=
FINAL BENGALI POSTER

The reference should account for approximately 95% of the final visual result.
The user's photo should primarily affect ONLY the facial identity.

OUTPUT

Maintain:
- Premium quality
- Photorealistic female subject
- Bengali cultural identity
- Patriotic Independence Day aesthetic
- Cinematic lighting
- Accurate Bengali typography
- Exact reference composition

Output: 4:5 aspect ratio.`;
    } else if (template.id === 'hindi') {
      prompt = `The supplied Hindi Independence Day poster is the approved COMPLETE MASTER DESIGN.
Treat the reference as a fixed finished poster, NOT as inspiration for creating a different poster.

This is a MALE-ONLY Hindi Independence Day template.

IDENTITY RULE

REFERENCE IMAGE = BODY + CLOTHING + POSE + FLAG + COMPOSITION
USER PHOTO = FACE / IDENTITY ONLY

The final person MUST be male.
Use the uploaded user's photo ONLY for facial identity.

Preserve from the Hindi reference:
- Male body presentation
- White traditional kurta
- Orange/saffron and green patriotic stole
- Hairstyle where compatible with natural face integration
- Body proportions
- Exact pose
- Posture
- Hand position
- Indian flag position
- Subject placement
- Subject scale
- Lighting
- Overall composition

DO NOT copy from the user's uploaded photo:
- Shirt
- T-shirt
- Suit
- Jacket
- Kurta
- Saree
- Accessories
- Clothing
- Body
- Body posture
- Body language
- Pose

The user's clothing MUST NOT override the reference clothing.
Only the user's recognizable facial identity should be transferred.

FACE INTEGRATION

Preserve the user's:
- Facial identity
- Face structure
- Eyes
- Nose
- Mouth
- Jawline
- Beard/facial hair where naturally compatible
- Skin tone
- Recognizable facial characteristics

Naturally integrate the user's face into the reference male subject.

Maintain:
- Natural face-to-body proportions
- Correct head angle
- Correct perspective
- Natural neck transition
- Matching lighting
- Matching shadows
- Consistent skin tone
- Photorealistic integration

The result must look like the original Hindi poster person with the user's real facial identity naturally integrated.
The face must NOT look pasted, artificial, distorted or like an obvious face swap.

COMPOSITION LOCK

Preserve the COMPLETE Hindi reference composition.

Keep unchanged:
- Top saffron/white/green brush strokes
- "आज़ादी का अमृत महोत्सव"
- "स्वतंत्रता दिवस"
- "2026"
- Indian flag and flagpole
- Birds
- India Gate
- Red Fort
- Male subject
- White kurta
- Tricolor stole
- Patriotic face paint
- Hand-held Indian flag
- Tricolor brush strokes
- Ashoka Chakra
- Bottom crowd silhouettes
- Bottom Indian flags
- Bottom five sections
- Overall patriotic landscape
- Lighting
- Visual hierarchy
- Typography hierarchy

DO NOT:
- Redesign the poster
- Create a new Hindi poster
- Move the male subject
- Change the pose
- Change the clothing
- Move the flag
- Replace India Gate
- Replace Red Fort
- Remove landmarks
- Add unrelated monuments
- Add unrelated objects
- Change the background
- Zoom into the subject
- Crop important elements
- Recompose the poster

The final result must look like the supplied Hindi reference with ONLY the user's facial identity personalized.

HINDI TYPOGRAPHY

Hindi typography is a critical part of this template.
Preserve the reference text accurately and in Devanagari script.

Required reference text:

आज़ादी का अमृत महोत्सव

स्वतंत्रता दिवस

2026

15 अगस्त 2026

गर्व से कहो हम भारतीय हैं

एक देश
एक जनता
एक गर्व
एक पहचान
एक भविष्य

IMPORTANT:
- Render Hindi text correctly in Devanagari.
- Do NOT translate the Hindi text into English or Bengali.
- Do NOT replace Hindi with random text.
- Do NOT alter spelling.
- Do NOT duplicate text.
- Do NOT add random text.
- Preserve the reference typography style, placement, scale and hierarchy.

PERSONALIZATION

Do NOT add the user's name.
Do NOT add the user's city.
Do NOT add any additional personalized text.

The reference poster itself is the complete finished design.
The ONLY user-specific personalization is the uploaded user's facial identity.

MOST IMPORTANT RULE

This is an IDENTITY PERSONALIZATION task, NOT a redesign task.

Think:
HINDI MASTER POSTER
+
USER'S MALE FACIAL IDENTITY
=
FINAL HINDI POSTER

The reference should account for approximately 95% of the final visual result.
The user's photo should primarily affect ONLY the facial identity.

OUTPUT

Maintain:
- Premium quality
- Photorealistic male subject
- Hindi cultural/localized identity
- Patriotic Independence Day aesthetic
- Cinematic lighting
- Accurate Hindi typography
- Exact reference composition

Output aspect ratio: 4:5.`;
    } else if (template.id === 'student') {
      prompt = `The supplied Student Independence Day poster is the approved COMPLETE MASTER DESIGN.
Treat the reference as a fixed finished poster, NOT as inspiration for creating a different student poster.

This is a MALE-ONLY Student / Youth Independence Day template.

IDENTITY RULE

REFERENCE IMAGE = STUDENT BODY + CLOTHING + BACKPACK + BOOKS + POSE + COMPOSITION
USER PHOTO = FACE / IDENTITY ONLY

The final person MUST be male.
Use the uploaded user's photo ONLY for facial identity.

Preserve from the Student reference:
- Male student body presentation
- White shirt
- Backpack
- Orange and green books
- Student appearance
- Hairstyle where compatible with natural face integration
- Body proportions
- Exact pose
- Posture
- Hand position
- Book position
- Backpack position
- Subject placement
- Subject scale
- Lighting
- Overall composition

DO NOT copy from the user's uploaded photo:
- Shirt
- T-shirt
- Suit
- Jacket
- Kurta
- Saree
- Clothing
- Accessories
- Body
- Body posture
- Body language
- Pose
- Bags
- Books

The user's clothing MUST NOT override the reference student's clothing.
The user's body MUST NOT override the reference student's body.
The user's pose MUST NOT override the reference student's pose.

Only the user's recognizable facial identity should be transferred.

FACE INTEGRATION

Preserve the user's:
- Facial identity
- Face structure
- Eyes
- Nose
- Mouth
- Jawline
- Beard/facial hair where naturally compatible
- Skin tone
- Recognizable facial characteristics

Naturally integrate the user's face into the reference student.

Maintain:
- Natural face-to-body proportions
- Correct head angle
- Correct perspective
- Natural neck transition
- Matching lighting
- Matching shadows
- Consistent skin tone
- Photorealistic integration

The result must look like the original Student poster person with the user's real facial identity naturally integrated.
The face must NOT look pasted, artificial, distorted or like an obvious face swap.

STUDENT IDENTITY MUST REMAIN

The final person must continue to look like the SAME student from the reference.

Keep:
- White student shirt
- Backpack
- Books
- Student posture
- Student body presentation
- Campus environment

Do NOT transform the student into:
- Businessman
- Formal corporate professional
- Traditional kurta-wearing person
- Military person
- Model
- Generic adult portrait

The uploaded user's appearance must not change the intended student identity of the reference.

COMPOSITION LOCK

Preserve the COMPLETE Student reference composition.

Keep unchanged:
- Top saffron/white/green brush strokes
- HAPPY
- INDEPENDENCE DAY
- 2026
- 15 AUGUST 2026
- Proud to be an Indian
- Large Indian flag
- Birds
- Ashoka Chakra
- Campus / institutional background
- Student crowd
- Female and male student figures in the background
- Main male student
- Backpack
- Books
- Tricolor brush strokes
- Bottom five sections
- Bottom monument/city silhouette
- Overall patriotic lighting
- Visual hierarchy
- Typography hierarchy

DO NOT:
- Redesign the poster
- Create a different student poster
- Move the main student
- Change the student's pose
- Remove the backpack
- Remove the books
- Change the student clothing
- Move the Indian flag
- Replace the campus background
- Add unrelated monuments
- Add unrelated objects
- Change the overall lighting
- Zoom into the face
- Crop important elements
- Recompose the poster

The final result must look like the supplied Student reference with ONLY the user's facial identity personalized.

TEXT

Keep the reference text exactly as part of the master design:

HAPPY
INDEPENDENCE DAY
2026
15 AUGUST 2026
Proud to be an Indian

ONE NATION
ONE PEOPLE
ONE PRIDE
ONE DREAM
ONE FUTURE

Do NOT add the user's name.
Do NOT add the user's city.
Do NOT add any additional personalized text.
Do NOT invent text.
Do NOT duplicate text.
Do NOT change the existing wording.

Maintain the reference typography style, placement, scale and hierarchy.

MOST IMPORTANT RULE

This is an IDENTITY PERSONALIZATION task, NOT a redesign task.

Think:
STUDENT MASTER POSTER
+
USER'S MALE FACIAL IDENTITY
=
FINAL STUDENT POSTER

The reference should account for approximately 95% of the final visual result.
The user's photo should primarily affect ONLY the facial identity.

OUTPUT

Maintain:
- Premium quality
- Photorealistic male student
- Youth/student identity
- Patriotic Independence Day aesthetic
- Cinematic lighting
- Clean educational/campus atmosphere
- Exact reference composition

Output aspect ratio: 4:5.`;
    } else {
      prompt = `Create the final personalized version of the provided Classic India Independence Day poster.

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
    }
    const aiConfig: OpenRouterProductionConfig = {
      model: process.env.OPENROUTER_MODEL || 'openai/gpt-image-2',
      prompt,
      referenceImageBase64: imageUrl,
      userImageBase64: referenceImageUrl
    };

    console.log(`Calling OpenRouter Model (${aiConfig.model}) for full poster generation for ${name}...`);
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

    // 1. We already have posterId and shareActionToken from the session
    const shareActionToken = session.shareActionToken;

    // 2. Save full-res poster to local storage (outside public access)
    const posterStorageDir = path.join(process.cwd(), 'data', 'posters');
    await fs.mkdir(posterStorageDir, { recursive: true }).catch(() => { });
    const filePath = path.join(posterStorageDir, `${posterId}.png`);
    await fs.writeFile(filePath, normalizedBuffer);

    // 3. Update the existing PosterSession to 'unlocked'
    session.status = 'unlocked';
    session.paymentUnlocked = true;
    session.unlockMethod = 'payment';
    session.aiGenerationStatus = 'success';
    session.razorpayPaymentId = razorpay_payment_id;
    session.paymentStatus = 'captured'; // Assumed from valid signature
    session.unlockedAt = new Date();
    
    await session.save();

    const sessionId = request.headers.get('x-session-id');
    if (sessionId) {
      await import('@/lib/models/AnalyticsEvent').then(({ AnalyticsEvent }) =>
        AnalyticsEvent.create({
          eventName: 'poster_generation_success',
          sessionId,
          posterId,
          templateId,
          properties: { generationTimeMs: aiResult.generationTimeMs, width: 1080, height: 1350 }
        }).catch(err => console.error('Analytics error:', err))
      );
    }

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

    const sessionId = request.headers.get('x-session-id');
    if (sessionId) {
      await import('@/lib/models/AnalyticsEvent').then(({ AnalyticsEvent }) =>
        AnalyticsEvent.create({
          eventName: 'poster_generation_failed',
          sessionId,
          properties: { failureCategory: error.message.includes('OpenRouter') ? 'provider_error' : 'internal_error' }
        }).catch(err => console.error('Analytics error:', err))
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate poster', details: error.message },
      { status: 500 }
    );
  }
}
