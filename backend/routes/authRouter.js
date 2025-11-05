import express from "express";
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, resetPassword, sendResetOtp } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";


const  authRouter = express.Router();


//auth endpoints
authRouter.get("/", (req, res) => {
    res.send("Auth Route");
});


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/send-verify-otp",userAuth, sendVerifyOtp);
authRouter.post("/verify-account",userAuth, verifyEmail);
authRouter.post("/is-auth",userAuth, isAuthenticated);
authRouter.post("/sent-reset-otp",userAuth, sendResetOtp);
authRouter.post("/reset-password",userAuth, resetPassword);




export default authRouter;





