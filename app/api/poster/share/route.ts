import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { PosterSession } from '@/lib/models/PosterSession';

export async function POST(request: Request) {
  try {
    const { posterId, shareActionToken } = await request.json();

    if (!posterId || !shareActionToken) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    await dbConnect();

    // Find the session first to check constraints
    const session = await PosterSession.findOne({ posterId });

    if (!session) {
      return NextResponse.json({ error: 'Poster not found' }, { status: 404 });
    }

    if (session.status === 'expired') {
      return NextResponse.json({ error: 'Poster session expired' }, { status: 400 });
    }

    if (session.shareActionToken !== shareActionToken) {
      return NextResponse.json({ error: 'Invalid share action token' }, { status: 403 });
    }

    if (session.status === 'unlocked' || session.shareUnlocked || session.paymentUnlocked) {
      return NextResponse.json({ success: true, message: 'Already unlocked', unlocked: true });
    }

    // Rate limiting / basic abuse prevention
    const now = new Date();
    if (session.lastShareActionAt) {
      const timeSinceLastShare = now.getTime() - session.lastShareActionAt.getTime();
      if (timeSinceLastShare < 2000) {
        // Prevent rapid clicks (less than 2s apart)
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      }
    }

    // Atomically increment the share count and update lastShareActionAt
    const updatedSession = await PosterSession.findOneAndUpdate(
      { posterId, status: 'generated', shareUnlocked: false },
      { 
        $inc: { shareCount: 1 },
        $set: { lastShareActionAt: now }
      },
      { new: true }
    );

    if (!updatedSession) {
      return NextResponse.json({ error: 'Could not update share count' }, { status: 400 });
    }

    let newlyUnlocked = false;

    // Check if threshold reached
    if (updatedSession.shareCount >= updatedSession.shareThreshold) {
      // Atomically unlock
      const finalSession = await PosterSession.findOneAndUpdate(
        { posterId, shareUnlocked: false },
        {
          $set: {
            shareUnlocked: true,
            status: 'unlocked',
            unlockMethod: 'share',
            unlockedAt: now,
          }
        },
        { new: true }
      );
      
      if (finalSession && finalSession.shareUnlocked) {
        newlyUnlocked = true;
      }
    }

    return NextResponse.json({
      success: true,
      shareCount: updatedSession.shareCount,
      shareThreshold: updatedSession.shareThreshold,
      unlocked: newlyUnlocked || updatedSession.shareCount >= updatedSession.shareThreshold
    });

  } catch (error: any) {
    console.error('Error processing share action:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
