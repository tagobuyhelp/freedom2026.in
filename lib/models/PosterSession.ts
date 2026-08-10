import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPosterSession extends Document {
  posterId: string;
  templateId: string;
  name: string;
  city: string;
  status: 'generated' | 'unlocked' | 'expired';
  unlockMethod: 'share' | 'payment' | null;
  shareCount: number;
  shareThreshold: number;
  shareUnlocked: boolean;
  paymentUnlocked: boolean;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentStatus?: string;
  aiGenerationStatus: string;
  shareActionToken: string; // Token required for share actions
  unlockedAt?: Date;
  lastShareActionAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

const PosterSessionSchema = new Schema<IPosterSession>(
  {
    posterId: { type: String, required: true, unique: true, index: true },
    templateId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    status: { type: String, enum: ['generated', 'unlocked', 'expired'], default: 'generated', index: true },
    unlockMethod: { type: String, enum: ['share', 'payment', null], default: null },
    shareCount: { type: Number, default: 0 },
    shareThreshold: { type: Number, required: true },
    shareUnlocked: { type: Boolean, default: false },
    paymentUnlocked: { type: Boolean, default: false },
    razorpayOrderId: { type: String, index: true, sparse: true },
    razorpayPaymentId: { type: String, index: true, sparse: true },
    paymentStatus: { type: String },
    aiGenerationStatus: { type: String, default: 'success' },
    shareActionToken: { type: String, required: true, index: true },
    unlockedAt: { type: Date },
    lastShareActionAt: { type: Date },
    expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model in dev
export const PosterSession: Model<IPosterSession> =
  mongoose.models.PosterSession || mongoose.model<IPosterSession>('PosterSession', PosterSessionSchema);
