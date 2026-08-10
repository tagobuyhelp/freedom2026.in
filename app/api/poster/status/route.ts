import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { PosterSession } from '@/lib/models/PosterSession';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const posterId = searchParams.get('posterId');

    if (!posterId) {
      return NextResponse.json({ error: 'Missing posterId' }, { status: 400 });
    }

    await dbConnect();
    const session = await PosterSession.findOne({ posterId });

    if (!session) {
      return NextResponse.json({ error: 'Poster not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      poster: {
        posterId: session.posterId,
        status: session.status,
        shareCount: session.shareCount,
        shareThreshold: session.shareThreshold,
        shareUnlocked: session.shareUnlocked,
        paymentUnlocked: session.paymentUnlocked,
        unlockMethod: session.unlockMethod,
      }
    });
  } catch (error: any) {
    console.error('Error fetching poster status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
