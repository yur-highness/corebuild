import orderModel from "../models/ordersModel.js";

// For ADMIN — update Status of orders
export const updateStatus = async (req, res) => {
  
}
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


//placing orders using COD method
export const placeOrder = async (req, res) => {
  try {
    const {userId,items,totalAmount,address} = req.body; // set by userAuth middleware
    const orderData = {
      user: userId,
      items,
      totalAmount,
      address,
      paymentMethod: "COD",
      payment,
      date,
    }

    const newOrder = await orderModel.create(orderData);
    await newOrder.save();

    //clear cart data after order placed
    await userModel.findByIdAndUpdate(userId, {
      cart:{}
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      // orderData,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      success: false,
      message: "Server error placing order",
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
