import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { AnalyticsEvent } from '@/lib/models/AnalyticsEvent';
import { PosterSession } from '@/lib/models/PosterSession';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    // 1. Get recent successful poster generation events
    const recentEvents = await AnalyticsEvent.find({ eventName: 'poster_generation_success' })
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();

    if (!recentEvents.length) {
      return NextResponse.json({ success: true, names: [] });
    }

    const posterIds = recentEvents
      .map(e => e.posterId)
      .filter((pid): pid is string => typeof pid === 'string');

    // 2. Fetch the corresponding PosterSession records to get display names
    const sessions = await PosterSession.find({
      posterId: { $in: posterIds },
      paymentUnlocked: true,
    })
      .select('name createdAt')
      .sort({ createdAt: -1 })
      .lean();

    const uniqueNames: string[] = [];
    // Filter pattern to exclude test accounts, developer names, or generic labels
    const testPattern = /^(?:test|demo|admin|dev|developer|guest|temp|asdf|qwerty|xyz|abc|user|unknown|testname|\d+)$/i;

    for (const session of sessions) {
      const cleanName = session.name.trim();

      // Exclude empty, single-character, or generic test names
      if (cleanName.length < 2) continue;
      if (testPattern.test(cleanName)) continue;
      if (/\d/.test(cleanName)) continue; // exclude names containing digits

      // Format to title case (e.g. "sourav" -> "Sourav")
      const formattedName = cleanName
        .split(' ')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      if (!uniqueNames.includes(formattedName)) {
        uniqueNames.push(formattedName);
      }

      if (uniqueNames.length === 10) break;
    }

    return NextResponse.json({ success: true, names: uniqueNames });
  } catch (error) {
    console.error('Error fetching social proof:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
