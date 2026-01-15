import { Router} from "express"
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";

const wishlistRouter = Router()

wishlistRouter.post("/", addToWishlist)
wishlistRouter.get("/", getWishlist)
wishlistRouter.delete("/:productId", removeFromWishlist)

export default wishlistRouter