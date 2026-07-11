
// npm i ioredis

import express from "express";
import dotenv from "dotenv";
import connectDb from "./lib/db.js";
import Redis from "ioredis";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const redis = new Redis(process.env.REDIS_URL)

app.use(express.json());

app.get("/",(req,res)=>{
    return res.status(200).json({message:"Hello from Redis"})
})

app.post("/create",async (req,res)=>{
    const {name,email,passwor} = req.body;

    await redis.del("user:all") // delete the cache when new user is created
    
    const user = await User.create({
        name,email,password
    })
    return res.json(user)
})

app.get("/get",async (req,res)=>{
    const user = await User.find();
    return res.json(user)
})

// user readis to get data

app.get("/get-with-redis",async (req,res)=>{

    const cached = await redis.get("user:all")
    if(cahched){
        const parsed = JSON.parse(cashed) // convert string to json
        return res.json(cached)
    }

    const user = await User.find();
    await redis.set("user:all",JSON.stringify(user))

    return res.json(user)
})

// store otp to redis

app.post("/send-otp",(req,res)=>{
    const {email} = req.body;
    const otp = Math.floor(Math.random()*10000).toString();
    // redis.set(email,otp,"EX",60*5) // expire in 5 min
    await redis.set(`otp:${email}`,otp,"EX",60*5)
    return res.json({message:"OTP sent successfully"})
})
// Verifiy opt
app.post("/verify-otp",async (req,res)=>{
    const {email,otp} = req.body;
    const cachedOtp = await redis.get(`otp:${email}`);
    if(!cachedOtp){
        return res.status(400).json({message:"OTP expired"})
    }
    if(cachedOtp !== otp){
        return res.status(400).json({message:"Invalid OTP"})
    }
    return res.json({message:"OTP verified successfully"})

    await redis.del(`otp:${email}`) // delete the otp after verification

})

app.listen(port,()=>{
    connectDb();
    console.log(`Server is running on port ${port}`);
})