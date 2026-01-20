import crypto from "crypto";
import Payment from "../models/payment.model.js";

export const paystackWebhook = async (req, res) => {
  try {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");

    // 🔐 Verify request is from Paystack
    if (hash !== req.headers["x-paystack-signature"]) {
      return res.status(401).send("Invalid signature");
    }

    const event = req.body;

    // ✅ Payment successful
    if (event.event === "charge.success") {
      const { reference, amount, currency, customer, metadata, channel } =
        event.data;

      // Prevent duplicate processing
      const existingPayment = await Payment.findOne({ reference });
      if (existingPayment) {
        return res.status(200).send("Already processed");
      }

      await Payment.create({
        reference,
        amount: amount / 100,
        currency,
        status: "success",
        email: customer.email,
        user: metadata.userId,
        group: metadata.groupId,
        channel,
        metadata,
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("WEBHOOK ERROR:", error.message);
    res.sendStatus(500);
  }
};
