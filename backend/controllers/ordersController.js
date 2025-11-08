import orderModel from "../models/ordersModel.js";


//  For ADMIN — get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find()
      .populate("user", "firstName lastName email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching orders",
    });
  }
};

// For USERS — get their own orders
export const getUserOrders = async (req, res) => {
  try {
    const {userId} = req.body; // set by userAuth middleware

    const orders = await orderModel.find({ user: userId })
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching user orders",
    });
  }
};
