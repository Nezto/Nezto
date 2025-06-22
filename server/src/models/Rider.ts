import { model, Schema } from 'mongoose';

const RiderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    payouts: [
      {
        status: { type: String, enum: ['pending', 'done'], default: 'pending' },
        amount: { type: Number },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export const Rider = model('Rider', RiderSchema);
