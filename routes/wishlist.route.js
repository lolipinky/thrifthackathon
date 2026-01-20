import { Router } from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";

const wishlistRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management
 */

/**
 * @swagger
 * /api/v1/wishlist/:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 6512d3b3f1c4f8c8b5a4c0d1
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
wishlistRouter.post("/", addToWishlist);

/**
 * @swagger
 * /api/v1/wishlist/:
 *   get:
 *     summary: Get all wishlist items for the user
 *     tags: [Wishlist]
 *     responses:
 *       200:
 *         description: Wishlist retrieved successfully
 *       500:
 *         description: Server error
 */
wishlistRouter.get("/", getWishlist);

/**
 * @swagger
 * /api/v1/wishlist/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to remove
 *     responses:
 *       200:
 *         description: Product removed successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
wishlistRouter.delete("/:productId", removeFromWishlist);

export default wishlistRouter;
