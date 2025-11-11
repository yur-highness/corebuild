import OrderModel from "../models/ordersModel.js";
import UserModel from "../models/userModel.js";


// For ADMIN — update Status of orders
export const updateStatus = async (req, res) => {
  
}
//  For ADMIN — get all orders
export const getAllOrders = async (req, res) => {
  try {
    const order = await OrderModel.find()
      .populate("user", "firstName lastName email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: order.length,
      order,
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
    // Option 1: userId comes from token middleware
    const {userId} = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID missing in request",
      });
    }

    const orders = await OrderModel.find({ user: userId })
      .populate("items.product_id", "name price images") // optional
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


//get order detailsbyID

export const getOrderDetails = async (req, res) => {
  try {
       const { id } = req.params;

  
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is missing in the request",
      });
    }

    // Find one order by its ID
    const order = await OrderModel.findById(id)
      .populate("items.product_id", "name price images")
      .populate("user", "firstName lastName email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching order details",
    });
  }
};

//placing orders using COD method
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!userId || !items?.length || !totalAmount || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Missing required order details",
      });
    }

    const orderData = {
      user: userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
    };

    const newOrder = await OrderModel.create(orderData);

    // ✅ Clear cart after order placed
    await UserModel.findByIdAndUpdate(userId, { cart: {} });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error placing order",
    });
  }
};



//placing orders using stipe method
export const placeOrderStripe = async (req, res) => {
  try {


    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      // order,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      success: false,
      message: "Server error placing order",
    });
  }
};



//placing orders using Razorpay method
export const placeOrderRazorpay = async (req, res) => {
  try {


    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      // order,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      success: false,
      message: "Server error placing order",
    });
  }
};
