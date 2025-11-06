import express from "express";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

// ✅ CRUD routes
productRouter.post("/", createProduct);       // Create new product
productRouter.get("/", getAllProducts);       // Get all products
productRouter.get("/:id", getProductById);    // Get single product by id
productRouter.put("/:id", updateProduct);     // Update product
productRouter.delete("/:id", deleteProduct);  // Delete product

export default productRouter;
