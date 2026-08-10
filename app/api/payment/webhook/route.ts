import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import { PosterSession } from '@/lib/models/PosterSession';
import { WebhookEvent } from '@/lib/models/WebhookEvent';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    const eventId = request.headers.get('x-razorpay-event-id');

    if (!signature || !eventId) {
      return NextResponse.json({ error: 'Missing headers' }, { status: 400 });
    }

    // Idempotency check
    await dbConnect();
    const existingEvent = await WebhookEvent.findOne({ eventId });
    if (existingEvent) {
      return NextResponse.json({ success: true, message: 'Event already processed' });
    }

    // Verify Webhook Signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest('hex');

    const isAuthentic = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    );

    if (!isAuthentic) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Parse the payload now
    const payload = JSON.parse(rawBody);
    const { event, payload: eventData } = payload;

    // Record the event for idempotency
    await WebhookEvent.create({ eventId, event });

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = eventData.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const paymentId = paymentEntity?.id;

      if (orderId && paymentId) {
        // Find session by orderId
        const session = await PosterSession.findOne({ razorpayOrderId: orderId });
        if (session && !session.paymentUnlocked) {
          await PosterSession.updateOne(
            { _id: session._id },
            {
              $set: {
                paymentUnlocked: true,
                status: 'unlocked',
                unlockMethod: 'payment',
                unlockedAt: new Date(),
                razorpayPaymentId: paymentId,
                paymentStatus: 'captured',
              }
            }
          );
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
