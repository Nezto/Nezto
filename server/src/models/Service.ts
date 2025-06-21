import { model, Schema } from 'mongoose';

const serviceSchema = new Schema(
  {
    active: { type: Boolean, default: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['daily', 'premium', 'specialized', 'household', 'other'],
      default: 'daily',
    },
    popular: { type: Boolean, default: false },
    turnaround: { type: String, default: 'not specified' }, // e.g., "12 hour", "2 days"
    icon: { type: String, default: null },
    thumbanil: { type: String, default: null },
    banner: { type: String, default: null },
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Service = model('Service', serviceSchema);
