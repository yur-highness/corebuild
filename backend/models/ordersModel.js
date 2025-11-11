import mongoose from "mongoose";



const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    payment:{
      type:Boolean, 
      default:false, 
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    shippingAddress: {
      fullName: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      street: String,
      phone: String,
     
     
    
  
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.models.Order||mongoose.model("Order", orderSchema);

export default OrderModel;
