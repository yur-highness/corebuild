import  express from "express";
import { getUserData, addToCart, toggleWishlist } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";



const userRouter = express.Router();

//user endpoints
userRouter.get("/data", userAuth, getUserData);
userRouter.post("/cart/add", userAuth, addToCart);
userRouter.post("/wishlist/toggle", userAuth, toggleWishlist);

export default userRouter;