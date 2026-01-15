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
groupRouter.post("/create", protect, isAdmin, createGroup);
groupRouter.post("/add-member", protect, isAdmin, addMember);
groupRouter.post("/remove-member", protect, isAdmin, removeMember);

// Protected route: anyone logged in can view groups
groupRouter.get("/", protect, getGroups);
groupRouter.get("/:id", protect, getGroupById);

export default groupRouter;
