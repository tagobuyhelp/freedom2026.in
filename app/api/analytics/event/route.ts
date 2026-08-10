import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { AnalyticsEvent } from '@/lib/models/AnalyticsEvent';

const ALLOWED_EVENTS = [
  'page_view',
  'poster_creator_started',
  'photo_selected',
  'poster_generation_started',
  'unlock_screen_viewed',
  'share_started',
  'share_completed',
  'payment_started'
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventName, sessionId, posterId, templateId, ...properties } = body;

    if (!eventName || !sessionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!ALLOWED_EVENTS.includes(eventName)) {
      return NextResponse.json({ error: 'Invalid event name' }, { status: 400 });
    }

    await dbConnect();

    // Sanitize properties: do not store raw photos or PII that might have been accidentally passed
    // We already know our trackClientEvent calls won't send them, but it's good defense in depth.
    delete properties.photo;
    delete properties.name;
    delete properties.city;
    delete properties.email;

    await AnalyticsEvent.create({
      eventName,
      sessionId,
      posterId,
      templateId,
      properties
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error tracking analytics event:', error);
    // Always return success to the client to not block UI or show errors for analytics failures
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
