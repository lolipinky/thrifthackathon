import { Router } from "express";
import {
  createGroup,
  getGroups,
  getGroupById,
  addMember,
  removeMember,
} from "../controllers/group.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const groupRouter = Router();

// Admin-only routes
/**
 * @swagger
 * /api/v1/group/create:
 *   post:
 *     summary: Create a new thrift group (Admin only)
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amountPerMonth
 *               - cycleStart
 *               - cycleEnd
 *             properties:
 *               name:
 *                 type: string
 *                 example: "December Thrift"
 *               amountPerMonth:
 *                 type: number
 *                 example: 500
 *               cycleStart:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-01"
 *               cycleEnd:
 *                 type: string
 *                 format: date
 *                 example: "2026-12-31"
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64d1f4a2f8b4e6a1c7a3c9b1"]
 *     responses:
 *       201:
 *         description: Group created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
groupRouter.post("/create", protect, isAdmin, createGroup);

/**
 * @swagger
 * /api/v1/group/add-member:
 *   post:
 *     summary: Add a member to a group (Admin only)
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - groupId
 *               - userId
 *             properties:
 *               groupId:
 *                 type: string
 *                 example: "64d1f4a2f8b4e6a1c7a3c9b1"
 *               userId:
 *                 type: string
 *                 example: "64d1f4a2f8b4e6a1c7a3c9b2"
 *     responses:
 *       200:
 *         description: Member added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Group or user not found
 *       500:
 *         description: Server error
 */
groupRouter.post("/add-member", protect, isAdmin, addMember);

/**
 * @swagger
 * /api/v1/group/remove-member:
 *   post:
 *     summary: Remove a member from a group (Admin only)
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - groupId
 *               - userId
 *             properties:
 *               groupId:
 *                 type: string
 *                 example: "64d1f4a2f8b4e6a1c7a3c9b1"
 *               userId:
 *                 type: string
 *                 example: "64d1f4a2f8b4e6a1c7a3c9b2"
 *     responses:
 *       200:
 *         description: Member removed successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Group or user not found
 *       500:
 *         description: Server error
 */
groupRouter.post("/remove-member", protect, isAdmin, removeMember);

// Protected route: anyone logged in can view groups

/**
 * @swagger
 * /api/v1/group:
 *   get:
 *     summary: Get all groups (Protected)
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of groups
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
groupRouter.get("/", protect, getGroups);

/**
 * @swagger
 * /api/v1/group/{id}:
 *   get:
 *     summary: Get group by ID (Protected)
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Group details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Group not found
 *       500:
 *         description: Server error
 */
groupRouter.get("/:id", protect, getGroupById);

export default groupRouter;
