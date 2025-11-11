import express from "express";
import { getAllOrders, getUserOrders, placeOrderRazorpay, placeOrderStripe, updateStatus,placeOrder, getOrderDetails } from "../controllers/ordersController.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// ✅ Admin route (requires admin)
orderRouter.get("/all-orders", adminAuth, getAllOrders);
orderRouter.post("/status-order", adminAuth, updateStatus);


// ✅ User route (requires login)
orderRouter.get("/my-orders", userAuth, getUserOrders);
orderRouter.get("/:id", userAuth, getOrderDetails); 
//payment route
orderRouter.post("/payment-razorpay", userAuth,placeOrderRazorpay);
orderRouter.post("/payment-stripe", userAuth,placeOrderStripe);
orderRouter.post("/payment-COD", userAuth, placeOrder);







export default orderRouter;
