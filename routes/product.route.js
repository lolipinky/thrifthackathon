import { Router } from "express";

import {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js"

const productRouter = Router()

productRouter.post("/", createProduct)
productRouter.get("/", getProducts)
productRouter.get("/:id", getProduct)
productRouter.put("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)

export default productRouter