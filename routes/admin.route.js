import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import {
  getDashboardStats,
  getAllPayments,
  getAllOrders,
  getGroupContributions
} from "../controllers/admin.controller.js";

const adminRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only management endpoints
 */

/**
 * @swagger
 * /api/v1/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Admin only)
 */
adminRouter.get("/dashboard", protect, isAdmin, getDashboardStats);

/**
 * @swagger
 * /api/v1/admin/payments:
 *   get:
 *     summary: Get all payments (marketplace + contributions)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payments
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Admin only)
 */
adminRouter.get("/payments", protect, isAdmin, getAllPayments);

/**
 * @swagger
 * /api/v1/admin/orders:
 *   get:
 *     summary: Get all marketplace orders
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of marketplace orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Admin only)
 */
adminRouter.get("/orders", protect, isAdmin, getAllOrders);

/**
 * @swagger
 * /api/v1/admin/groups/contributions:
 *   get:
 *     summary: Get all group contribution statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Group contribution breakdown
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Admin only)
 */
adminRouter.get(
  "/groups/contributions",
  protect,
  isAdmin,
  getGroupContributions
);

export default adminRouter;

