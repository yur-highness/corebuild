import express from "express";
import { getAllOrders, getUserOrders } from "../controllers/ordersController.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// ✅ User route (requires login)
orderRouter.get("/my-orders", userAuth, getUserOrders);

// ✅ Admin route (requires admin)
orderRouter.get("/all", adminAuth, getAllOrders);

export default orderRouter;
