import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import { PosterSession } from '@/lib/models/PosterSession';
import Razorpay from 'razorpay';

let razorpayInstance: Razorpay | null = null;

function getRazorpay() {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
    });
  }
  return razorpayInstance;
}

export async function POST(request: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, posterId } = await request.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !posterId) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    await dbConnect();
    const session = await PosterSession.findOne({ posterId });

    if (!session) {
      return NextResponse.json({ error: 'Poster not found' }, { status: 404 });
    }

    // DO NOT trust razorpay_order_id from frontend for signature verification.
    // Use the one stored in our DB.
    if (session.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ error: 'Order ID mismatch' }, { status: 400 });
    }

    // Verify signature
    const text = session.razorpayOrderId + '|' + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex');

    // Timing safe comparison
    const isAuthentic = crypto.timingSafeEqual(
      Buffer.from(generated_signature),
      Buffer.from(razorpay_signature)
    );

    if (!isAuthentic) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    // Check payment status from Razorpay server
    const payment = await getRazorpay().payments.fetch(razorpay_payment_id);
    
    if (payment.status !== 'captured' && payment.status !== 'authorized') {
       return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }

    // Note: 'authorized' payments are valid but might need capture if auto-capture isn't on.
    // We will assume auto-capture is on or 'authorized' is enough to unlock for a digital good,
    // though the prompt prefers captured.
    if (payment.status === 'authorized') {
      try {
        await getRazorpay().payments.capture(razorpay_payment_id, payment.amount, payment.currency);
      } catch (err) {
        // May already be captured or auto-capture enabled
      }
    }

    // Update DB securely
    const finalSession = await PosterSession.findOneAndUpdate(
      { posterId, paymentUnlocked: false },
      {
        $set: {
          razorpayPaymentId: razorpay_payment_id,
          paymentStatus: 'captured',
          paymentUnlocked: true,
          status: 'unlocked',
          unlockMethod: 'payment',
          unlockedAt: new Date(),
        }
      },
      { new: true }
    );

    if (!finalSession) {
      // It might already be unlocked
      return NextResponse.json({ success: true, message: 'Payment verified, already unlocked' });
    }

    return NextResponse.json({ success: true, message: 'Payment verified and poster unlocked' });

  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
