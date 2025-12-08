import { Router } from "express";
import { newUser } from "../contollers/createAccCon.js"

const createRouter = Router()

createRouter.post("/createAcc", newUser)

export default createRouter