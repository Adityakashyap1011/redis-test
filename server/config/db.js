import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL=process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("Mongodb connected successfully");
}).catch((err)=>{
    console.log("Mongodb connection failed:",err.message);
});
export default mongoose;