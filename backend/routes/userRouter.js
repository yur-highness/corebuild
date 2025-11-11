import  express from "express";
import { getUserData, addToCart, toggleWishlist, getUserCart } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";



const userRouter = express.Router();

//user endpoints
userRouter.get("/data", userAuth, getUserData);
userRouter.get("/cart", userAuth, getUserCart);
userRouter.post("/cart/add", userAuth, addToCart);
userRouter.post("/wishlist/toggle", userAuth, toggleWishlist);

export default userRouter;