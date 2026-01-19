import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { generateGroupContributions } from "../controllers/contribution.controller.js";

const contributionRouter = Router()
//admin only
contributionRouter.post("/contributions/generate", protect, isAdmin, generateGroupContributions )
contributionRouter.get("/contributions", protect, isAdmin, generateGroupContributions)

//user
contributionRouter.get("/contributions/my", protect, isAdmin, generateGroupContributions)

export default contributionRouter