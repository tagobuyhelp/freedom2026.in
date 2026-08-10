import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { AnalyticsEvent } from '@/lib/models/AnalyticsEvent';
import crypto from 'crypto';

export async function GET(request: Request) {
  try {
    // 1. Authorization check
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_SECRET_KEY;

    if (!adminKey) {
      // If no admin key is configured, disable the endpoint entirely for safety
      return NextResponse.json({ error: 'Reporting disabled' }, { status: 403 });
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const providedKey = authHeader.split(' ')[1];
    
    // Timing-safe comparison to prevent timing attacks
    const providedBuffer = Buffer.from(providedKey);
    const expectedBuffer = Buffer.from(adminKey);
    
    if (providedBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch Data
    await dbConnect();

    // Run aggregations for the funnel
    const funnelPipeline = [
      {
        $group: {
          _id: "$eventName",
          count: { $sum: 1 },
          uniqueSessions: { $addToSet: "$sessionId" }
        }
      },
      {
        $project: {
          eventName: "$_id",
          totalCount: "$count",
          uniqueCount: { $size: "$uniqueSessions" },
          _id: 0
        }
      }
    ];

    const funnelDataRaw = await AnalyticsEvent.aggregate(funnelPipeline);
    
    const funnelData = funnelDataRaw.reduce((acc, curr) => {
      acc[curr.eventName] = { total: curr.totalCount, unique: curr.uniqueCount };
      return acc;
    }, {} as Record<string, { total: number, unique: number }>);

    // Run specific calculations
    const visitors = funnelData['page_view']?.unique || 0;
    const generationsStarted = funnelData['poster_generation_started']?.total || 0;
    const generationsSuccess = funnelData['poster_generation_success']?.total || 0;
    
    const shareUnlocks = funnelData['share_unlock_completed']?.total || 0;
    const paidUnlocks = funnelData['payment_success']?.total || 0;
    const downloads = funnelData['poster_downloaded']?.total || 0;

    const generationSuccessRate = generationsStarted > 0 ? (generationsSuccess / generationsStarted) * 100 : 0;
    
    // Unlocks are relative to successful generations, or unlock screen views
    const unlockScreenViews = funnelData['unlock_screen_viewed']?.unique || 0;
    const shareUnlockRate = unlockScreenViews > 0 ? (shareUnlocks / unlockScreenViews) * 100 : 0;
    const paidConversionRate = unlockScreenViews > 0 ? (paidUnlocks / unlockScreenViews) * 100 : 0;
    const downloadConversionRate = generationsSuccess > 0 ? (downloads / generationsSuccess) * 100 : 0;

    const revenue = paidUnlocks * 10; // ₹10 per paid unlock
    const revenuePerVisitor = visitors > 0 ? revenue / visitors : 0;
    const revenuePerGeneratedPoster = generationsSuccess > 0 ? revenue / generationsSuccess : 0;

    // Calculate average generation time
    const genSuccessEvents = await AnalyticsEvent.find({ eventName: 'poster_generation_success' }, { 'properties.generationTimeMs': 1 }).lean();
    let totalTime = 0;
    let timeCount = 0;
    for (const ev of genSuccessEvents) {
      if (ev.properties && ev.properties.generationTimeMs) {
        totalTime += ev.properties.generationTimeMs;
        timeCount++;
      }
    }
    const averageGenerationTimeMs = timeCount > 0 ? totalTime / timeCount : 0;

    return NextResponse.json({
      success: true,
      funnel: funnelData,
      metrics: {
        visitors,
        generationsStarted,
        generationsSuccess,
        shareUnlocks,
        paidUnlocks,
        downloads,
        generationSuccessRate: generationSuccessRate.toFixed(2) + '%',
        shareUnlockRate: shareUnlockRate.toFixed(2) + '%',
        paidConversionRate: paidConversionRate.toFixed(2) + '%',
        downloadConversionRate: downloadConversionRate.toFixed(2) + '%',
        revenueInr: revenue,
        revenuePerVisitorInr: revenuePerVisitor.toFixed(2),
        revenuePerGeneratedPosterInr: revenuePerGeneratedPoster.toFixed(2),
        averageGenerationTimeMs: Math.round(averageGenerationTimeMs)
      }
    });
  } catch (error: any) {
    console.error('Error fetching analytics summary:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
