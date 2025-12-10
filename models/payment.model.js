import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true }, // Paystack reference
    amount: { type: Number, required: true },
    currency: { type: String, default: "NGN" },
    status: { type: String, required: true }, // success, failed, abandoned
    email: { type: String, required: true },
    metadata: { type: Object },
    gatewayResponse: { type: String },
    channel: { type: String }, // card, bank, transfer, etc.
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
