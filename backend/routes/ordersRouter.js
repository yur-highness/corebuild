import express from "express";
import { getAllOrders, getUserOrders, placeOrderRazorpay, placeOrderStripe, updateStatus,placeOrder } from "../controllers/ordersController.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// ✅ User route (requires login)
orderRouter.get("/my-orders", userAuth, getUserOrders);
//payment route
orderRouter.post("/payment-razorpay", userAuth,placeOrderRazorpay);
orderRouter.post("/payment-strip", userAuth,placeOrderStripe);
orderRouter.post("/place-COD", userAuth, placeOrder);

// ✅ Admin route (requires admin)
orderRouter.get("/all-orders", adminAuth, getAllOrders);
orderRouter.post("/status-order", adminAuth, updateStatus);






export default orderRouter;
