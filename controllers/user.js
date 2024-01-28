import {User} from "../models/user.js"
import jwt from "jsonwebtoken"
import ErrorHandler from "../middlewares/error.js";

import { sendCookie } from "../utils/fratures.js";
import bcrypt from "bcrypt";
// export const getallusers=async(req,res)=>{}
export const login=async(req,res,next)=>{
    try{
        const {email,password}=req.body
    const user=await User.findOne({email}).select("+password");
    if(!user) return next(new ErrorHandler("Register First",400))
   const isMatch =await bcrypt.compare(password,user.password)
   if(!isMatch) return next(new ErrorHandler("Invalid Email or Password",400))
sendCookie(user,res, `Welcome Back. ${user.name}`,200)
    }
    catch(error){
        next(error)
    }
}
export const register =async(req,res,next)=>{
   try{
    const {name,email,password}=req.body;
    let user =await User.findOne({email});

    if(user)  return next(new ErrorHandler("User already Exist",400))
//     return res.status(404).json({
// success:false,
// message:"User already Exist",})
const hashedpassword=await bcrypt.hash(password,10)
user = await User.create({name,email,password:hashedpassword})

sendCookie(user,res,"Registered Successfully",201)

   }
   catch(error)
   {
    next(error)
   }
}



export const getMyProfile =(req,res) =>{
   try{
    res.status(200).json({
        success:true,
        user:req.user,
    })
   }
   catch(error)
   {
    next(error)
   }
}
export const logout=(req,res) =>{
 try{
    res.status(200)
    .cookie("token","",{expires : new Date(Date.now())})
    .json({
        success:true,
        user:req.user,
    })
}
 catch(error)
 {
    next(error)
 }
}
