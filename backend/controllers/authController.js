import bcrpypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
     //validationsv
    if(!firstName || !lastName || !email || !password) {
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
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({id: user._id, email: user.email, role: user.role}, process.env.JWT_SECRET_KEY, {
            expiresIn: "6d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 6 * 24 * 60 * 60 * 1000
        });     


        //sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to CoreBuild",
            text: `Hi ${firstName},\n\nWelcome to CoreBuild! We're excited to have you join our community.\n\nBest regards,\nCoreBuild Team`
        };

        await transporter.sendMail(mailOptions);
        

        return res.status(200).json({
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
        
        const token = jwt.sign({id: user._id, email: user.email, role: user.role}, process.env.JWT_SECRET_KEY, {
            expiresIn: "6d"
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 6 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      userData: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role, // 🔥 This is what frontend needs
      },
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


export const logout = async (req, res) => {
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
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


export const sendVerifyOtp = async (req, res) => {

     const {userId} = req.body;
     const user = await UserModel.findById(userId);
    try{
        //validations
        if(user.isAccountVerified) {
            return res.status(400).json({
                success: false,
                message: "Account already verified Plz login now..."
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, "0");
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 *60 * 60 * 1000;
        await user.save(); 

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify your account",
            text: `Hi ${user.firstName},\n\nPlease use the following OTP to verify your account: ${otp}\n\nBest regards,\nCoreBuild Team`
        };
        await transporter.sendMail(mailOptions);


        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
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


export const verifyEmail = async (req, res) => {
      const {userId, otp} = req.body;
      const user = await UserModel.findById(userId);




    try{
        if(!userId || !otp) {
        return res.status(400).json({
            success: false,
            message: "Missing details"
        }); 
        }
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        if(user.isAccountVerified) {
            return res.status(400).json({
                success: false,
                message: "Account already verified Plz login now..."
            });
        }

        if(user.verifyOtp   === "" ||  user.verifyOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if(user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Account verified successfully"
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


export const isAuthenticated = async (req, res) => {
    try{

        
        return res.status(200).json({
            success: true,
            message: "User is authenticated",
            
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



export const sendResetOtp = async (req, res) => {
    const {email} = req.body;
      if(!email) {
            return res.status(400).json({
                success: false,
                message: "e-mail does not exist"
            });
        }
    try{

        const user = await UserModel.findOne({email});
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User  not found"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, "0");
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save(); 

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "OTP for password Reset",
            text: `Hi ${user.firstName},\n\nPlease use the following OTP to reset your password: ${otp}\n\nBest regards,\nCoreBuild Team`
        };
        await transporter.sendMail(mailOptions);
        
      
        return res.status(200).json({
            success: true,
            message: "OTP for password reset sent successfully to your e-mail"
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


export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

      if(!email || !otp || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Missing details provide new password failed"
        }); 
    }

    try{

        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        if(user.resetOtp   === "" ||  user.resetOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if(user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            }); 
        }        

        const hashedPassword = await bcrpypt.hash(newPassword, 13);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;
        await user.save();          

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
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