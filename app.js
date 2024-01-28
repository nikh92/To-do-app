import express from "express";
import {config} from "dotenv"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import {errormiddleware } from "./middlewares/error.js";
export const app=express();
//middlewares
 app.use(express.json())
 app.use(cookieParser())
 app.use(cors(
    {
       orign:[process.env.FRONTEND_URL],
       methods:["GET","PUT","POST","DELETE"],
       credentials:true,
    })
 )
 //using routers
 app.use("/api/v1/users",userRouter)
 app.use("/api/v1/task",taskRouter)

config({
    path:"./data/config.env"
})
app.get("/",(req,res)=>{
    res.send("NICE WORKING")
})

//using error middleware
app.use(errormiddleware)

