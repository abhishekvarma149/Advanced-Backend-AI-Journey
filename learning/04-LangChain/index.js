
import { ChatGoogleGenerativeAI} from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    maxOutputTokens: 2048,
    temperature: 0.7, // Adjust the temperature for creativity (0.0 - 1.0)
    maxRetries: 3, // Number of retries in case of failure
    maxTokens: 2048, // Maximum number of tokens in the response  

})

app.post("/ai",async (req,res)=>{
    const {input} = req.body;

    // const response = await llm.invoke(input);
    const response = await llm.invoke([
        {role: "system", content: "You are a helpful assistant.And your name is Mathew"},
        {role: "human", content: input}
    ]);
     
    return res.status(200).json({"ai": response.content}) 
})

app.get("/", (req,res)=>{
    return res.json({message:"Hello"})
})
console.log(process.env.GOOGLE_API_KEY);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})