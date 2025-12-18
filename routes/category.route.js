import { Router } from "express"

import { createCategory, getCategories } from "../controllers/category.controller"

const categoryRouter = Router()
categoryRouter.post('/', createCategory)
categoryRouter.get('/', getCategories)

export default categoryRouter