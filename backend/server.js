import  express from "express";
import '@dotenvx/dotenvx/config'
import cors  from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/ordersRouter.js";


const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

const allowedOrigins = process.env.ALLOWED_ORIGINS;

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials: true,}));

app.get("/", (req, res) => {
    res.send("u   are  a  ninja  and  your  under  a  genjutsu");
});

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});

