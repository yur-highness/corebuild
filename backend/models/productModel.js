import mongoose from "mongoose";



const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
}, { _id: false });

const productSchema = new mongoose.Schema({

  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  currentPrice: { type: Number },
  images: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  isAvailable: { type: Boolean, default: true },
  description: { type: String },
  specifications: [{ type: String }],
  features: [{ type: String }],
  variants: [variantSchema],
  latestArrival: { type: Boolean, default: false },
  quantity: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;
