
import { ChatGoogleGenerativeAI} from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { Annotation, MemorySaver, MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import {ChatGroq} from "@langchain/groq";
import { ToolNode} from "@langchain/langgraph/prebuilt";
import { TavilySearch } from "@langchain/tavily";

import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());



const tool = new TavilySearch({
  maxResults: 5,
  topic: "general",
});

const checkPointer = new MemorySaver()

const tools = [tool];
const toolNode  = new ToolNode(tools)

const callLLM = async (state) =>{
    const response = await llm.invoke([
        {role: "system", content: "You are a helpful assistant.And your name is MathewUse conversation memory first. Only use tools when the answer requires external real-time information (e.g., weather, news, web search, stock prices). Do not call tools for simple conversations, memory-based questions, greetings, or personal context."},
        ...state.messages
    ]);
    return {messages:[response]}
}

const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    maxOutputTokens: 2048,
    temperature: 0.7, // Adjust the temperature for creativity (0.0 - 1.0)
    maxRetries: 3, // Number of retries in case of failure
    maxTokens: 2048, // Maximum number of tokens in the response  

}).bindTools(tools);



app.post("/ai",async (req,res)=>{
    const {input} = req.body;

    const response = await graph.invoke({messages:[
        {role:"user",
        content: input
        }
    ]},
    {
        configurable:{thread_id:"user123"}
    }
)
    
    return res.status(200).json({"ai": response.messages[response.messages.length-1].content}) 
})

app.get("/", (req,res)=>{
    return res.json({message:"Hello"})
})
console.log(process.env.GOOGLE_API_KEY);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

const shouldContinue = async (state)=>{
    const lastMessage = state.messages[state.messages.length-1];
    if(lastMessage.tool_calls.length > 0){
        return "tools"
    }else{
        return "__end__"
    }
}


const graph = new StateGraph(MessagesAnnotation)
.addNode("agent",callLLM)
.addNode("tools",toolNode)
//start -> agent - > end
.addEdge("__start__","agent")
.addEdge("agent","__end__")
.addEdge("tools","agent")
.addConditionalEdges("agent",shouldContinue)
.compile({checkpointer:checkPointer});
