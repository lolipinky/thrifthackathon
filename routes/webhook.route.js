/**
 * @swagger
 * /api/v1/webhook/paystack:
 *   post:
 *     summary: Paystack payment webhook
 *     description: |
 *       Receives and verifies Paystack payment events.
 *       This endpoint is called automatically by Paystack after a transaction.
 *     tags: [Webhooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *                 example: charge.success
 *               data:
 *                 type: object
 *                 example:
 *                   reference: "psk_123456789"
 *                   amount: 500000
 *                   currency: NGN
 *                   channel: card
 *                   customer:
 *                     email: user@example.com
 *                   metadata:
 *                     userId: 65a91f6b8d0e3f1b2c9a1234
 *                     groupId: 65a91f6b8d0e3f1b2c9a5678
 *     responses:
 *       200:
 *         description: Webhook received successfully
 *       401:
 *         description: Invalid Paystack signature
 *       500:
 *         description: Server error
 */


import { Router } from "express";
import { paystackWebhook } from "../controllers/webhook.controller.js";

const webhookRouter = Router()

// Paystack webhook endpoint
webhookRouter.post("/paystack", paystackWebhook);

export default webhookRouter;
