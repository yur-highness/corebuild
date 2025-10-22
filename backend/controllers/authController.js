import bcrpypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body;
     //validationsv
    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields"
        });
    }


    //logic
    try{
        //validations
        const existingUser = await UserModel.findOne({email});
        if(existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                });
            }

        
        const hashedPassword = await bcrpypt.hash(password, 13);
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "6d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            samesite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 6 * 24 * 60 * 60 * 1000
        });


        res.status(200).json({
            success: true,
            message: "User registered successfully Plz login now",
        });
    } 
    catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `User registration failed: ${error.message}`
        });
    }
}



export const login = async (req, res) => {
    const {email, password} = req.body;

    //validations
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields"
        });
    }


    //logic
    try{
        const user = await UserModel.findOne({email});
         //validations
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid  E-mail or User does not exist Plz register first"
            });
        }

        const isMatch = await bcrpypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "6d"
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            samesite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 6 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully"
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `User registration failed: ${error.message}`
        });
    }
}


export const  logout = async (req, res) => {
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            samesite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `error: ${error.message}`
        });
    }
}