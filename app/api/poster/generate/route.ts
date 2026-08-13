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
    } else if (template.id === 'public-leader') {
      prompt = `The supplied Public Leader reference poster is the MASTER VISUAL REFERENCE.
This template is designed for people who want a dignified Indian public-leader / community-leader / political-leader style Independence Day poster.

IMPORTANT:
Do NOT redesign the visual concept.
Do NOT create a completely different poster.
The supplied reference must control the composition, visual hierarchy, environment, lighting and patriotic design.

1. TEMPLATE PURPOSE
The final poster should make the uploaded user look like a confident Indian public leader addressing people on Independence Day.
The visual message should communicate: Leadership, Patriotism, Public service, Unity, Confidence, National pride.
The design must remain generic and must NOT imitate any specific real politician or public figure.

2. USER IDENTITY — CRITICAL
USER PHOTO = FACIAL IDENTITY ONLY
Use the uploaded user photo primarily for: Face identity, Facial structure, Eyes, Nose, Mouth, Jawline, Skin tone, Recognizable facial features, Beard/facial hair where applicable, Natural hairstyle where compatible.
The final person must clearly resemble the uploaded user.
The face must look naturally photographed as part of the reference scene.
Do NOT create an artificial pasted face.
Do NOT make the person look like a generic AI model.

3. REFERENCE PERSON VS USER PHOTO
REFERENCE IMAGE controls: Body, Clothing, Podium, Raised-hand gesture, Pose, Microphones, Public-speaking presentation, Crowd, Background, Parliament, India Gate, Indian flag, Lighting, Composition, Typography, Color palette.
USER PHOTO controls: Facial identity ONLY.
Do NOT transfer the user's: Shirt, T-shirt, Jacket, Suit, Saree, Kurta, Accessories, Body, Body proportions, Body language, Pose, Background.
The uploaded user's clothing must NEVER override the Public Leader reference clothing.

4. LEADER PRESENTATION
Preserve the reference's public-speaking composition.
The person should be: Standing behind the podium, Confident, Dignified, Looking toward the audience/viewer, One hand naturally raised in a leadership/public-speaking gesture, Upper body clearly visible, Face clearly visible, Naturally positioned behind the podium.
Keep the podium and microphones.
The subject must feel like a generic Indian public leader, NOT a celebrity or a specific real politician.

5. MALE + FEMALE SUPPORT
This template should support both male and female users.
If the uploaded user is male: Use natural male presentation while preserving the reference composition.
If the uploaded user is female: Use natural female presentation while preserving the same leadership composition.
Do NOT force the reference male's facial characteristics onto a female user.
Do NOT force a male body onto a female user.
The user's gender identity should remain natural.
However, the visual design, podium, gesture, background and overall leadership composition must remain consistent.

6. CLOTHING
Preserve the reference's formal Indian leadership clothing style:
- White traditional/Indian shirt or kurta
- Dark navy/blue Nehru-style vest/jacket
- Small Indian flag pin where appropriate
For female users, adapt the same formal Indian leadership aesthetic naturally without copying clothing from the user's uploaded photograph.
Do NOT use the user's original clothing.

7. BACKGROUND — PRESERVE
Keep the approved reference environment:
LEFT: Parliament-style government building
RIGHT: India Gate
BACKGROUND: Indian flags, Patriotic crowd, Warm golden lighting, Festive Independence Day atmosphere, Birds, Subtle tricolor elements.
Do NOT replace these with unrelated architecture.
Do NOT introduce random landmarks.
Do NOT change the concept into a generic studio portrait.

8. PODIUM
The podium is a major part of this template.
Preserve: Wooden podium structure, Dark navy front panel, Microphones, Gold national emblem-style visual, Leadership presentation.
The podium should remain realistic and premium.
Do not allow the podium to cover the user's face.
The user's face must remain completely visible above the podium.

9. TEXT — NO NAME OR CITY
IMPORTANT:
DO NOT generate: User name, City, Location, Political party name, Political party logo, Candidate designation, Election slogan, Campaign slogan, Phone number, Website, Social media handle.
This is a PERSONALIZED PATRIOTIC LEADER STYLE, not an election campaign poster.
Use only the approved generic Independence Day text.

10. MAIN TYPOGRAPHY
Preserve the reference typography:
HAPPY
INDEPENDENCE DAY
2026
15 AUGUST 2026
Proud to be an Indian

Typography should remain: Bold, Premium, Clean, Highly readable, Navy + saffron + green, Centrally balanced.
Do NOT add extra text. Do NOT duplicate text. Do NOT invent text.

11. PODIUM MESSAGE
Preserve the reference's podium message:
ONE NATION
ONE PEOPLE
ONE PRIDE
ONE DREAM
ONE FUTURE
Keep it integrated naturally into the podium.
Do not add the user's name or city.

12. BOTTOM SECTION
Preserve the complete bottom five-section design:
ONE NATION United in Diversity
ONE PEOPLE Stronger Together
ONE PRIDE Proud to be Indian
ONE DREAM Better Tomorrow
ONE FUTURE For Our Future Generations
All five sections must be fully visible. Do NOT crop the bottom section.

13. COMPOSITION LOCK & TOP SAFE MARGIN
CRITICAL FRAMING REQUIREMENT:
The entire supplied Public Leader reference poster MUST fit completely inside the final 4:5 output.
The AI must NOT crop, zoom, stretch, or reframe the reference composition.

### TOP SAFE MARGIN FIX (CRITICAL)
- The word "HAPPY" at the very top MUST NOT touch the image boundary.
- Move the entire typography group ("HAPPY", "INDEPENDENCE DAY", etc.) slightly downward.
- Reduce the overall typography scale by approximately 15% to create a safe margin.
- Leave at least 5% empty vertical safe space (padding) above the word "HAPPY".
- The complete "HAPPY" text MUST be fully visible inside the frame.

NO CROPPING RULE:
Do NOT allow any important text, person, podium, flag, or monument to touch the image boundary.
Maintain a safe visual margin around the entire composition.
The output should feel slightly zoomed OUT rather than zoomed IN to preserve the complete reference.
If there is a conflict between enlarging the person and preserving the complete poster, ALWAYS prioritize preserving the COMPLETE POSTER.

The following MUST remain fully visible:
- HAPPY (Must have white space / safe margin above)
- INDEPENDENCE DAY
- 2026
- 15 AUGUST 2026
- Proud to be an Indian
- User's complete visible face
- Raised hand
- Podium
- Microphones
- Parliament
- India Gate
- Indian flag
- Crowd
- Ashoka Chakra elements
- Bottom five feature sections
- Bottom monument silhouette

COMPOSITION PRIORITY:
1. Complete poster boundaries and safe margins
2. Top typography ("HAPPY") visibility
3. Complete podium and person
4. Bottom feature sections
5. Identity integration

14. FACIAL INTEGRATION
The user's face must match the reference scene naturally.
Maintain: Correct face-to-body proportion, Natural neck transition, Correct head angle, Matching perspective, Matching lighting, Matching shadows, Consistent skin tone, Natural expression.
Do not make the face appear pasted onto the reference body.

15. VISUAL STYLE
Maintain the approved reference aesthetic: Premium, Cinematic, Photorealistic, Professional, Patriotic, Warm golden lighting, Saffron / white / green / navy palette, High visual impact, Social-media ready.
Avoid excessive AI fantasy effects. Avoid cartoon styling. Avoid unrealistic facial features.

16. POLITICAL SAFETY / GENERIC LEADER RULE
This is NOT a specific political campaign template.
Do NOT imitate: Narendra Modi, Rahul Gandhi, Mamata Banerjee, Any MLA, Any MP, Any Chief Minister, Any political celebrity, Any other real public figure.
The final person must remain the uploaded user with their own facial identity.
Do not add any political party logo, symbol, flag or campaign branding.

17. FINAL GENERATION LOGIC
Think of the generation as:
PUBLIC LEADER MASTER DESIGN + USER'S REAL FACIAL IDENTITY + NATURAL LEADERSHIP PRESENTATION = FINAL PERSONALIZED POSTER
The reference should control approximately 90–95% of the visual design.
The uploaded user photo should primarily control facial identity.`;
    } else if (template.id === 'india-map') {
      prompt = `The supplied India Map reference image is an APPROVED COMPLETE POSTER DESIGN.
Do NOT redesign the concept. The current visual style is approved and should remain intact.

USER IDENTITY — CRITICAL
The current main person in the reference is back-facing. Change ONLY the person's presentation so that the personalized user can be clearly recognized.
The main person should be:
- Front-facing or natural 3/4 facing
- Clearly visible from approximately waist/chest up
- Looking naturally toward the viewer or slightly toward the flag
- Naturally integrated into the patriotic scene

The user's uploaded photo should be used ONLY for facial identity.

REFERENCE = body + clothing + pose + flag + overall composition
USER PHOTO = FACE / IDENTITY ONLY

Preserve the reference person's:
- Clothing
- Body
- Pose (adjusted naturally for front/3/4 facing)
- Flag-holding concept
- Patriotic presentation
- Lighting
- Overall visual style

Do NOT transfer the user's clothing, body, accessories or background.
The final face must be naturally integrated and photorealistic.

INDIA MAP MUST REMAIN THE HERO BACKGROUND
Preserve the existing:
- Large India map
- Saffron/orange upper map treatment
- Green lower map treatment
- India Gate inside the map
- Landscape
- Ashoka Chakra
- Indian flag
- Tricolor brush strokes
- Patriotic sky
- Birds
- Crowd
- Monument silhouettes

Do NOT replace the India map with a different design.
Do NOT turn this into a normal portrait poster.
The India Map must remain the dominant visual identity of the template.

MAIN PERSON PLACEMENT
Move the main personalized person slightly upward and make the person large enough to be clearly visible.
The subject must NOT:
- Be cut off at the bottom
- Touch the image boundary
- Disappear into the crowd
- Become too small
- Be completely back-facing

The person's face must remain clearly visible.
Maintain a natural relationship between the person and the India Map.

CRITICAL FRAMING FIX
The complete poster must fit inside the 4:5 output.
Do NOT crop:
- Top typography
- HAPPY INDEPENDENCE DAY
- 2026
- India Map
- India Gate
- Main person
- Indian flag
- Ashoka Chakra
- Tricolor brush strokes
- Bottom crowd
- Bottom monuments
- Bottom decorative elements

Nothing important should touch or cross the image boundaries.
If necessary, slightly zoom OUT the complete composition.
Prioritize COMPLETE POSTER VISIBILITY over making the subject excessively large.

PERSONALIZED TEXT
Personalize the designated identity area using ONLY the following text:

${name.toUpperCase()}
${city.toUpperCase()}

Place the name and city in a dedicated clean area.
Do NOT place the name over the India map or over important landmarks.
Do NOT combine the name and city into an unnatural text block.
Do NOT invent or modify the user's name or city.

EXISTING TEXT
Preserve:
HAPPY
INDEPENDENCE DAY
2026
PROUD TO BE AN INDIAN

Do not duplicate text.
Do not invent additional slogans.
Maintain the existing typography hierarchy.

DESIGN PRESERVATION
The following must remain visually consistent with the approved reference:
- Watercolor India map
- Tricolor palette
- India Gate
- Ashoka Chakra
- Indian flag
- Patriotic crowd
- Golden cinematic lighting
- Saffron/green brush strokes
- Premium Independence Day aesthetic

THIS IS NOT A REDESIGN. It is a controlled personalization and composition correction.

MOST IMPORTANT RULE
The final output should communicate immediately: "THIS IS THE USER'S PERSONALIZED INDEPENDENCE DAY POSTER"
The user's face must be clearly visible.
REFERENCE = approximately 90–95% of visual design
USER PHOTO = primarily facial identity
Do not let the uploaded user's clothing or body redesign the reference.

OUTPUT
- 4:5 aspect ratio
- Premium, Photorealistic, Cinematic, High-resolution
- Complete poster inside frame
- Clearly visible personalized face
- No cropping
- No random text
- No unrelated objects`;
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

CRITICAL FRAMING REQUIREMENT:
The entire supplied Student reference poster MUST fit completely inside the final 4:5 output.
The AI must NOT crop, zoom, stretch, or reframe the reference composition.

IMPORTANT:
- The complete "HAPPY" text at the top MUST be fully visible.
- "INDEPENDENCE DAY" MUST be fully visible.
- "2026" MUST be fully visible.
- "15 AUGUST 2026" MUST be fully visible.
- "Proud to be an Indian" MUST be fully visible.
- The complete main student MUST remain inside the frame.
- The entire backpack and books must remain visible as in the reference.
- The complete tricolor brush-stroke composition must remain visible.
- The large Ashoka Chakra must remain fully visible.
- ALL five bottom feature/icon sections MUST be fully visible.
- The entire bottom monument/city silhouette MUST be visible.
- Nothing important may be cut off by the top, bottom, left or right edges.

NO CROPPING RULE:
Do NOT allow any important text, icon, person, flag, monument or decorative element to touch the image boundary.
Maintain a safe visual margin around the entire composition.
The output should feel slightly zoomed OUT rather than zoomed IN if necessary to preserve the complete reference.
If there is a conflict between enlarging the person and preserving the complete poster, ALWAYS prioritize preserving the COMPLETE POSTER.

COMPOSITION PRIORITY:
1. Complete reference composition
2. Complete typography
3. Complete main student
4. Complete bottom feature section
5. Correct identity integration
6. Visual scale

Never sacrifice the poster boundaries for a larger subject.

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

CRITICAL FIX — TYPOGRAPHY SCALE:
Reduce the overall typography scale by approximately 10–15% while preserving the existing typography hierarchy and style.
Specifically:
- Make "HAPPY" approximately 10–15% smaller.
- Make "INDEPENDENCE DAY" approximately 10–15% smaller.
- Make "2026" approximately 10–15% smaller.
- Slightly reduce the size of "15 AUGUST 2026".
- Slightly reduce "Proud to be an Indian".
- Reduce spacing between the top typography elements proportionally.

DO NOT remove any text.
DO NOT change the font style.
DO NOT redesign the typography.
DO NOT make the text tiny.
The typography should remain bold, premium and highly readable.

TOP SAFE MARGIN:
There MUST be a clear empty/safe margin above "HAPPY".
"HAPPY" must be completely visible.
No letter may touch or cross the top edge.
The complete top typography block must fit comfortably inside the frame.

BOTTOM SAFE MARGIN:
The complete bottom feature section MUST be visible.
All five icons and their labels (ONE NATION, ONE PEOPLE, ONE PRIDE, ONE DREAM, ONE FUTURE) must be fully visible.
The bottom monument/city silhouette must also remain visible.
Do NOT allow the bottom section to be cropped.

IMPORTANT COMPOSITION RULE:
DO NOT solve the problem by making the main student significantly smaller.
The current student scale is good. Keep the main student approximately the same size.
Instead:
1. Reduce typography size by 10–15%.
2. Reduce unnecessary vertical gaps.
3. Slightly compress the overall upper typography block.
4. Preserve enough space at the bottom for the complete five-icon section.
5. Keep the complete poster inside the 4:5 frame.

Maintain the reference typography style, placement, and hierarchy, but apply the 10-15% scale reduction as instructed.
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
