import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
  Cores: { type: String },
  Threads: { type: String },
  "Base Clock": { type: String },
  "Max Boost Clock": { type: String },
  Cache: { type: String },
  TDP: { type: String },
  Socket: { type: String },
  Architecture: { type: String },
}, { _id: false });

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  images: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  description: { type: String },
  specifications: specificationSchema,
  features: [{ type: String }],
  variants: [variantSchema],
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;
