import { model, Schema } from "mongoose";



const OrderSchema = new Schema(
    {
        price: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "accepted", "completed", "canceled", "processing", "refunded", "to_client", "to_vendor"],
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
        pickup_location: { type: Array<Number>, required: true, index: "2dsphere" }, // [longitude, latitude]
        drop_location: { type: Array<Number>, required: true, index: "2dsphere" }, // [longitude, latitude]
        vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
        completed_at: { type: Date, default: null }, // Date when the order was completed
    },
    { timestamps: true }
);


export const Order = model("Order", OrderSchema);