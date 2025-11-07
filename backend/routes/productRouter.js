import express from "express";
import { upload } from "../middleware/multer.js";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

// ✅ CRUD routes
productRouter.post("/add",upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),createProduct);       // Create new product
productRouter.get("/list", getAllProducts);       // Get all products
productRouter.get("/:id", getProductById);    // Get single product by id
productRouter.put("/:id", updateProduct);     // Update product
productRouter.delete("/:id", deleteProduct);  // Delete product

export default productRouter;
