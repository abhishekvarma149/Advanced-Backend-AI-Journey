// gateway is for microservices architecture, it will act as a single entry point for all the services. It will route the requests to the appropriate service based on the URL path.
//npm i express dotenv express-http-proxy



import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());

app.get("/",(req,res)=>{
    return res.status(200).json({message:`Hello from ${process.env.SERVER_NAME} service`});
})

app.use("/auth",proxy("http://auth-service:8001"));
app.use("/order",proxy("http://order-service:8002"));
app.use("/product",proxy("http://product-service:8003"));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})