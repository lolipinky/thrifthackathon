import { Router } from "express";
import { paystackWebhook } from "../controllers/webhook.controller.js";

const webhookRouter = Router()

// Paystack webhook endpoint
webhookRouter.post("/paystack", paystackWebhook);

export default webhookRouter;
