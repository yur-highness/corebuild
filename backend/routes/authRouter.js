import express from "express";
import { register, login, logout } from "../controllers/authController.js";


const  authRouter = express.Router();


//auth endpoints
authRouter.get("/", (req, res) => {
    res.send("Auth Route");
});


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);


export default authRouter;





