import { model, Schema } from 'mongoose';

const VendorSchema = new Schema(
  {
    status: { type: Boolean, default: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    location: { type: [Number], required: true, index: '2dsphere' }, // [longitude, latitude]
    services: [
      {
        service: { type: Schema.Types.ObjectId, ref: 'Service' },
        reviews: [{ type: String }],
      },
    ],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Vendor = model('Vendor', VendorSchema);
