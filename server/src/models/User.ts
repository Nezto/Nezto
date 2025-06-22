import { model, Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    token: { type: String, required: true }, // JWT token
    name: { type: String, required: true },
    avatar: { type: String }, // Profile image URL
    roles: {
      type: [String],
      enum: ['user', 'rider', 'vendor', 'admin'],
      default: ['user'],
    },
    location: { type: [Number] }, // [longitude, latitude]
    address: { type: String },
    payment: { type: String },
  },
  { timestamps: true },
);

export const User = model('User', UserSchema);
