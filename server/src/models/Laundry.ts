import { model, Schema } from "mongoose";

const laundrySchema = new Schema(
  {
    status: { type: Boolean, default: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: { type: [Number], required: true, index: "2dsphere" }, // [longitude, latitude]
    },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Laundry = model("Laundry", laundrySchema);