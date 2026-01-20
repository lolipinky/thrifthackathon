import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const orderRouter = Router();

orderRouter.post("/", protect, createOrder);
orderRouter.get("/my-orders", protect, getUserOrders);
orderRouter.get("/:id", protect, getOrderById);

orderRouter.get("/", protect, isAdmin, getAllOrders);
orderRouter.patch("/:id/status", protect, isAdmin, updateOrderStatus);

export default orderRouter;
