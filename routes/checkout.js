import { Router } from "express";
import {initiateCheckout,verifyStatus} from "../controllers/checkout.js";

const checkoutRouter = Router();


/**
 * @swagger
 * /api/v1/checkout/initiate:
 *   post:
 *     summary: Initiate a Paystack payment
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - amount
 *             properties:
 *               email:
 *                 type: string
 *                 example: demo@example.com
 *               amount:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Payment initiation successful
 *       400:
 *         description: Bad request
 *       500:
 *         description: Something went wrong
 */
checkoutRouter.post("/initiate", initiateCheckout);


/**
 * @swagger
 * /api/v1/checkout/verify:
 *   get:
 *     summary: Verify payment status
 *     tags: [Checkout]
 *     parameters:
 *       - in: query
 *         name: reference
 *         schema:
 *           type: string
 *         required: true
 *         description: Paystack payment reference
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user making the payment
 *       - in: query
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the thrift group for the contribution
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Payment not successful or missing reference
 *       500:
 *         description: Something went wrong
 */

checkoutRouter.get("/verify",verifyStatus)

export default checkoutRouter;