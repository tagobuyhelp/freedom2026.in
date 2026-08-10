import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import dbConnect from '@/lib/db';
import { PosterSession } from '@/lib/models/PosterSession';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const posterId = searchParams.get('posterId');

    if (!posterId || typeof posterId !== 'string') {
      return NextResponse.json({ error: 'Missing posterId' }, { status: 400 });
    }

    // Validate posterId format to prevent path traversal (uuid v4 format check)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(posterId)) {
      return NextResponse.json({ error: 'Invalid posterId format' }, { status: 400 });
    }

    await dbConnect();
    const session = await PosterSession.findOne({ posterId });

    if (!session) {
      return NextResponse.json({ error: 'Poster not found' }, { status: 404 });
    }

    if (session.status === 'expired') {
      return NextResponse.json({ error: 'Poster session expired' }, { status: 400 });
    }

    if (session.status !== 'unlocked' || (!session.shareUnlocked && !session.paymentUnlocked)) {
      return NextResponse.json({ error: 'Poster download is locked' }, { status: 403 });
    }

    const posterStorageDir = path.join(process.cwd(), 'data', 'posters');
    const filePath = path.join(posterStorageDir, `${posterId}.png`);

    try {
      const fileBuffer = await fs.readFile(filePath);
      
      const sessionId = searchParams.get('sessionId');
      if (sessionId) {
        import('@/lib/models/AnalyticsEvent').then(({ AnalyticsEvent }) => 
          AnalyticsEvent.create({
            eventName: 'poster_downloaded',
            sessionId,
            posterId,
            templateId: session.templateId
          }).catch(err => console.error('Analytics error:', err))
        );
      }
      
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': `attachment; filename="freedom2026-${session.name.replace(/\s+/g, '-').toLowerCase()}.png"`,
          'Cache-Control': 'no-store, max-age=0',
        },
      });
    } catch (fsError) {
      console.error('Error reading poster file:', fsError);
      return NextResponse.json({ error: 'Poster file not found on server' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('Error in download endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
