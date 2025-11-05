import  express from "express";
import '@dotenvx/dotenvx/config'
import cors  from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRouter.js";


const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true,}));

app.get("/", (req, res) => {
    res.send("u   are  a  ninja  and  your  under  a  genjutsu");
});

app.use("/api/auth", authRouter)


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});

