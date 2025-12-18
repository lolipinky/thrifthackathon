import { Router } from "express"

import { createCategory, getCategories } from "../controllers/category.controller.js"

const categoryRouter = Router()
categoryRouter.post('/', createCategory)
categoryRouter.get('/', getCategories)

export default categoryRouter