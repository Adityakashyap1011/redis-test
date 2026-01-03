import Redis from "ioredis"


const redis=new Redis();
redis.on("connect",()=>{
    console.log("Connected to redis");
})
export default redis;