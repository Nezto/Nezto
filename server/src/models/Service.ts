import { model, Schema } from 'mongoose';

const serviceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    turnaround: { type: String },
    icon: { type: String },
    banner: { type: String },
    thumbnail: { type: String },
    popular: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Service = model('Service', serviceSchema);
