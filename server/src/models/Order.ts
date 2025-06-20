import { model, Schema } from "mongoose";



const OrderSchema = new Schema(
    {
      price: { type: Number, required: true },
      status: {
        type: String,
        enum: ["pending", "accepted", "completed", "canceled"],
        default: "pending",
      },
      type: {
        type: String,
        enum: ["wash", "dry_clean", "iron"],
        required: true,
      }, // e.g., "wash", "dry_clean"

      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      rider: { type: Schema.Types.ObjectId, ref: "User" }, // Optional if assigned
      otp: { type: String, required: true }, // String to prevent leading-zero issues
      pick_time: { type: Date, required: true },
      drop_time: { type: Date, required: true },
      vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
  );


export const Order = model("Order", OrderSchema);