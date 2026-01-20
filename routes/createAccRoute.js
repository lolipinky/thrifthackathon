import { Router } from "express";
import { newUser, signin } from "../controllers/soloAccCon.js";

const createRouter = Router();
/**
 * @swagger
 * tags:
 *   name: Account
 *   description: User account authentication
 */

/**
 * @swagger
 * /api/v1/account/createAcc:
 *   post:
 *     summary: Create a new user account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - phoneNumber
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Lola Samuel
 *               email:
 *                 type: string
 *                 example: lola@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *               phoneNumber:
 *                 type: string
 *                 example: 08012345678
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Validation error
 */
createRouter.post("/createAcc", newUser);

/**
 * @swagger
 * /api/v1/account/signin:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: lola@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
createRouter.post("/signin", signin);

export default createRouter;

