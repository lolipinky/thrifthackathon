import { Router } from "express";
import { newUser, signIn } from "../contollers/createAccCon.js";

const createRouter = Router();

createRouter.post("/createAcc", newUser);
createRouter.post("/signin", signIn);

export default createRouter;
