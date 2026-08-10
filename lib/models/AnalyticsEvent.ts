import mongoose, { Document, Model } from 'mongoose';

export interface IAnalyticsEvent extends Document {
  eventName: string;
  sessionId: string;
  posterId?: string;
  templateId?: string;
  properties?: any;
  createdAt: Date;
}

const AnalyticsEventSchema = new mongoose.Schema<IAnalyticsEvent>(
  {
    eventName: { type: String, required: true },
    sessionId: { type: String, required: true },
    posterId: { type: String, required: false },
    templateId: { type: String, required: false },
    properties: { type: mongoose.Schema.Types.Mixed, required: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AnalyticsEventSchema.index({ eventName: 1 });
AnalyticsEventSchema.index({ createdAt: -1 });
AnalyticsEventSchema.index({ sessionId: 1 });
AnalyticsEventSchema.index({ posterId: 1 });
AnalyticsEventSchema.index({ templateId: 1 });

export const AnalyticsEvent: Model<IAnalyticsEvent> =
  mongoose.models.AnalyticsEvent || mongoose.model<IAnalyticsEvent>('AnalyticsEvent', AnalyticsEventSchema);
