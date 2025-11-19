import Product from "../models/productModel.js";
import {v2 as cloudinary } from 'cloudinary';
import mongoose from "mongoose";


// ✅ Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price ,
      originalPrice ,
      currentPrice,
      description,
      specifications,
      features,
      variants,
    } = req.body;



      const  image1 = req.files.image1 && req.files.image1[0];
      const  image2 = req.files.image2 && req.files.image2[0];
      const  image3 = req.files.image3 && req.files.image3[0];
      const  image4 = req.files.image4 && req.files.image4[0];

      const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);

      let imagesUrl = await Promise.all(
        images.map(async(item) => 
          { 
            let result = await cloudinary.uploader.upload(item.path,{resource_type:"image"});
            return result.secure_url
          })
      );

    // ✅ validate required fields
    if (!name || !price || imagesUrl.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }



      const productData = {
        name,
        category,
        price,
        originalPrice,
        currentPrice,
        description,
        specifications,
        features,
        variants,
        images: imagesUrl,
      };

      const product = await Product(productData);
      await product.save();
     



    res.status(201).json({ 
      success: true,
      message: "Product created successfully" 
    });
  } 
  catch (error) {
    res.status(400).json({ success: false, message: error.message });
    console.log(error);
  }
};

// ✅ Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ 
      success: true,  
      products
    });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // id from URL

    let product;

    // ✅ Case 1: ID is a valid Mongo ObjectId (_id)
    if (mongoose.isValidObjectId(id)) {
      product = await Product.findById(id);
    }

    // ✅ Case 2: ID is a custom string (like "690f609be65f3e8aaf2c7b22")
    if (!product) {
      product = await Product.findOne({ id });
    }

    // ✅ Handle not found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.error("getProductById Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// ✅ Delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    if (mongoose.isValidObjectId(id)) {
      product = await Product.findByIdAndDelete(id);
    } else {
      product = await Product.findOneAndDelete({ id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
