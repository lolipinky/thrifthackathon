import { Router } from "express";
import { newUser, signin } from "../controllers/soloAccCon.js";

const createRouter = Router();

createRouter.post("/createAcc", newUser);
createRouter.post("/signin", signin);

export default createRouter;
