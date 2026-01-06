import express from "express"
import dotenv from "dotenv"
// import redisClient from "./config/redis.js";
import connectDB from "./config/db.js";
import itemRoutes from "./routes/item.routes.js";


dotenv.config();

const app=express();
app.use(express.json());

const PORT=process.env.PORT||5000

app.use("/api", itemRoutes);

app.get('/',(req,res)=>{
    res.send("Hello from server");
})

const startServer = async () => {
  try {
    await connectDB(); 

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
