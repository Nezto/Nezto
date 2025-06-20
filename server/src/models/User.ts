import { model, Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true }, // JWT token from Google OAuth
    name: { type: String, required: true },
    picture: { type: String }, // Profile image URL
    role: {
      type: [String],
      enum: ['user', 'rider', 'vendor', 'admin'],
      default: 'user',
    },
    location: { type: String }, // User's location coordinates [lat, lon]
  },
  { timestamps: true },
);

export const User = model('User', UserSchema);
