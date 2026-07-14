import {redis} from '../index.js';
const rateLimit = async (req,res, next)=>{
    const ip = req.ip;
    const key = `ratelimit:${ip}`;
    const requests = await redis.incr(key); // increment by 1 every time a request is made
    if(requests === 1){
        await redis.expire(key,60) // set the expiration time to 60 seconds
    }
    if(requests > 5){
        return res.status(429).json({message:"Too many requests"})
    }
    next();

}
export default rateLimit;