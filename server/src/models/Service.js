import { model, Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    serviceId: { type: String, required: true, unique: true, trim: true },
    name: {type: String, required: true, trim: true},
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true, enum: ["daily", "premium", "specialized", "household", "other"] },
    popular: { type: Boolean, default: false },
    turnaround: { type: String, default: "not specified" },
    icon: { type: String, default: null },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Service = model("Service", serviceSchema);