import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import dbConnect from '@/lib/db';
import { PosterSession } from '@/lib/models/PosterSession';

function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error('Razorpay API keys (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) are missing from environment variables.');
  }

  return new Razorpay({ key_id, key_secret });
}

export async function POST(request: Request) {
  try {
    const { posterId } = await request.json();

    if (!posterId) {
      return NextResponse.json({ error: 'Missing posterId' }, { status: 400 });
    }

    await dbConnect();
    const session = await PosterSession.findOne({ posterId });

    if (!session) {
      return NextResponse.json({ error: 'Poster not found' }, { status: 404 });
    }

    if (session.status === 'expired') {
      return NextResponse.json({ error: 'Poster session expired' }, { status: 400 });
    }

    if (session.status !== 'pending_payment') {
      return NextResponse.json({ error: 'Invalid session state for payment' }, { status: 400 });
    }

    if (session.paymentUnlocked || session.shareUnlocked) {
      return NextResponse.json({ error: 'Poster is already unlocked' }, { status: 400 });
    }

    let priceInr = 49; // Default STANDARD tier price

    const premiumTemplates = ['india-map', 'patriot-creator'];
    const exclusiveTemplates = ['public-leader', 'peoples-leader', 'national-vision', 'constitution-democracy'];

    if (exclusiveTemplates.includes(session.templateId)) {
      priceInr = 79; // EXCLUSIVE tier price
    } else if (premiumTemplates.includes(session.templateId)) {
      priceInr = 69; // PREMIUM tier price
    }

    const amountInPaise = priceInr * 100;

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${posterId.substring(0, 10)}_${Date.now()}`,
    };

    const order = await getRazorpay().orders.create(options);

    if (!order) {
      return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
    }

    // Save order ID to session
    session.razorpayOrderId = order.id;
    await session.save();

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID, // Safe to send to frontend for checkout
    });

  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
