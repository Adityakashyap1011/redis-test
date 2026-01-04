import redis from "../config/redis.js";

const WINDOW_SIZE = 60;
const MAX_REQUESTS = 10;

export const rateLimiter = async(req, res, next)=>{
    try{
        const clientIP=req.ip;
        const cnt= await redis.incr(clientIP);
        if(cnt===1){
            await redis.expire(clientIP, WINDOW_SIZE);
        }
        if(cnt>MAX_REQUESTS){
            return res.status(429).send("Too many requests - try again later");
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            message: "Rate limiting failed",
            error: error.message
        });
    }
}