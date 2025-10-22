import mongoose, { connect } from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Connected to MongoDB"));
        const connectDB = await mongoose.connect(`${process.env.MONGODB_URL}/corebuild`);
        console.log(`MongoDB Connected: ${connectDB.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;