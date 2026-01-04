import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL=process.env.MONGODB_URL;

const connectDB=async ()=>{
    try{
        const conn= await mongoose.connect(MONGODB_URL);
        console.log(`MongoDB connected`);
    }catch(error){
        console.error("MongoDB connection failed:", error.message);
    }
}

export default connectDB;