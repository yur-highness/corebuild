import express from "express";
import { upload } from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

// ✅ CRUD routes
productRouter.post("/add",adminAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]), createProduct);       // Create new product
productRouter.get("/list", getAllProducts);       // Get all products
productRouter.get("/:id", getProductById);    // Get single product by id
productRouter.put("/:id",adminAuth, updateProduct);     // Update product
productRouter.delete("/:id", adminAuth,deleteProduct);  // Delete product

export default productRouter;
