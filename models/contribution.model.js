import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "createUser",
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GROUP",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    cycleMonth: {
      type: String, // e.g. "2026-01"
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contribution", contributionSchema);
