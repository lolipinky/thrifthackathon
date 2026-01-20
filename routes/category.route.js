import { Router } from "express"

import { createCategory, getCategories } from "../controllers/category.controller.js"

const categoryRouter = Router()


/**
 * @swagger
 * /api/v1/category/:
 *   post:
 *     summary: Post Category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Name is required
 *       500:
 *         description: Something went wrong
 */

categoryRouter.post('/', createCategory)


/**
 * @swagger
 * /api/v1/category/:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: List of categories
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       500:
 *         description: Something went wrong
 */

categoryRouter.get('/', getCategories)

export default categoryRouter 