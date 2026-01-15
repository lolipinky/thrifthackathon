import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { getDashboardStats, getAllPayments, getAllOrders, getGroupContributions } from "../controllers/admin.controller.js";

const adminRouter = Router();


adminRouter.get("/dashboard", protect, isAdmin, getDashboardStats);
adminRouter.get("/payments", protect, isAdmin, getAllPayments);
adminRouter.get("/orders", protect, isAdmin, getAllOrders );
adminRouter.get("/groups/contributions", protect, isAdmin, getGroupContributions)

export default adminRouter;
