import express from "express"
import dotenv from "dotenv"
import redis from "./config/redis.js";
import mongoose from "./config/db.js";


dotenv.config();


const app=express();

const PORT=process.env.PORT||5000

app.get('/',(req,res)=>{
    res.send("Hello from server");
})

app.listen(PORT,()=>{
    console.log(`Server running successfully at http://localhost:${PORT}`);
})