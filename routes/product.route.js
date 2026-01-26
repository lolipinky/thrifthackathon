import { Router } from "express";

import {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js"

const productRouter = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProduct:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           example: Gucci Her
 *         description:
 *           type: string
 *           example: Luxury perfume for ladies
 *         price:
 *           type: number
 *           example: 1200000
 *         category:
 *           type: string
 *           description: Category ObjectId (NOT category name)
 *           example: 65a91f6b8d0e3f1b2c9a1234
 *         stock:
 *           type: number
 *           example: 10
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - image1.jpg
 *             - image2.jpg
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 696fb3f108af8a88feb42f09
 *         name:
 *           type: string
 *           example: Gucci Her
 *         description:
 *           type: string
 *           example: Luxury perfume for ladies
 *         price:
 *           type: number
 *           example: 1200000
 *         category:
 *           type: string
 *           example: 65a91f6b8d0e3f1b2c9a1234
 *         stock:
 *           type: number
 *           example: 10
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */


productRouter.post("/", createProduct)

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

productRouter.get("/", getProducts)

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

productRouter.get("/:id", getProduct)

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gucci Her
 *               description:
 *                 type: string
 *                 example: Updated luxury perfume description
 *               price:
 *                 type: number
 *                 example: 1250000
 *               category:
 *                 type: string
 *                 description: Category ObjectId
 *                 example: 65a91f6b8d0e3f1b2c9a1234
 *               stock:
 *                 type: number
 *                 example: 15
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - image1.jpg
 *                   - image2.jpg
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

productRouter.put("/:id", updateProduct)

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

productRouter.delete("/:id", deleteProduct)

export default productRouter