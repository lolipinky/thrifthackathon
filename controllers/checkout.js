import axios from "axios";
import { PAYSTACK_SECRET } from "../config/env.js";
import Payment from "../models/payment.model.js"

export const initiateCheckout = async (req, res) => {
  const DECRate = 500;
  const PAYSTACK_ENDPOINT = "https://api.paystack.co/transaction/initialize";

  try {
    const response = await axios.post(
      PAYSTACK_ENDPOINT,
      {
        email: "demo@example.com",
        amount: DECRate * 100,
        callback_url: "https://fffads/verify",
        metadata: {
          time: Date.now(),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    );

    console.log(response.data);

    return res.status(200).json({ data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).send("Something went wrong");
  }
};



export const verifyStatus = async (req, res) => {
  const { reference } = req.query;

  if (!reference) {
    return res.status(400).send("Please pass in your reference number");
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    );

    console.log("VERIFY RAW RESPONSE:", response.data);

    const data = response.data.data;

    if (data.status !== "success") {
      return res.status(400).send("Payment not successful");
    }

    // SAVE TO DATABASE
    await Payment.create({
      reference: data.reference,
      amount: data.amount / 100,
      email: data.customer.email,
      status: data.status,
      paid_at: data.paid_at,
      channel: data.channel,
      currency: data.currency,
      metadata: data.metadata,
    });

    return res.status(200).json(data);

  } catch (error) {
    console.log(error.response?.data || error.message);
    return res.status(500).send("Something went wrong");
  }
};
