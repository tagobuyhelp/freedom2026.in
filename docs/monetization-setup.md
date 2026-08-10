# Freedom2026 Monetization Setup

This document outlines the setup and architecture for the Classic India template monetization (Share & Pay to Download).

## 1. Environment Variables

Ensure `.env.local` is populated with:

```env
MONGODB_URI=mongodb+srv://...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

POSTER_DOWNLOAD_PRICE_INR=10
POSTER_SHARE_THRESHOLD=10
POSTER_SESSION_TTL_HOURS=24
```

## 2. MongoDB Setup

- The application uses Mongoose to connect to MongoDB.
- Collections created: `postersessions`, `webhookevents`.
- Indexes are automatically created by Mongoose (ensure your DB user has permissions to create indexes, or create them manually).
- The `expiresAt` field in `PosterSession` uses a TTL index to automatically delete expired sessions after `POSTER_SESSION_TTL_HOURS`.

## 3. Local Poster Storage

- High-resolution generated posters are stored in `/data/posters/`.
- This directory is intentionally outside of the `/public` directory so files cannot be accessed directly via URL.
- The `GET /api/poster/download` endpoint is the only way to access these files, and it verifies unlock status before streaming.

## 4. Razorpay Setup (Test Mode)

1. Sign up/Log in to Razorpay Dashboard.
2. Switch to **Test Mode**.
3. Go to **Account & Settings -> API Keys** and generate a new key pair. Put these in `.env.local`.
4. Go to **Account & Settings -> Webhooks**.
5. Add a new webhook:
   - **Webhook URL**: `https://<your-ngrok-or-domain>/api/payment/webhook`
   - **Secret**: A strong random string (e.g., generated via `openssl rand -hex 20`). Put this in `RAZORPAY_WEBHOOK_SECRET`.
   - **Active Events**: `payment.captured`, `order.paid`.
6. Ensure **Auto Capture** is enabled in Razorpay settings for payments to be automatically captured upon authorization.

## 5. Security & Idempotency

- **Share Unlock**: The `shareActionToken` ensures only the original creator (or someone with the exact session token) can increment the share count. Rapid requests are rate-limited.
- **Payment Verification**: We verify the Razorpay signature securely using `crypto.timingSafeEqual`. We *always* fetch the expected `order_id` from the database, never trusting the client's provided `order_id` for the signature text.
- **Webhook Idempotency**: Razorpay webhook events are tracked using the `x-razorpay-event-id` header in the `WebhookEvent` collection. Duplicate events are acknowledged but not processed twice.

## 6. Going Live

When moving to Live Mode:
1. Generate Live API Keys in Razorpay.
2. Update `.env.local` on the production server.
3. Configure the Live Webhook in Razorpay with the production URL and a new webhook secret.
4. Verify auto-capture settings in the Live Dashboard.
