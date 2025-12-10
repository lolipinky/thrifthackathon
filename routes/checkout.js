import { Router } from "express";
import {initiateCheckout,verifyStatus} from "../contollers/checkout.js";

const checkoutRouter = Router();

checkoutRouter.post("/initiate", initiateCheckout);
checkoutRouter.get("/verify",verifyStatus)

export default checkoutRouter;