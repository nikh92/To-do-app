import ErrorHandler from "../middlewares/error.js";
import {Task} from "../models/task.js";

export const newTask = async(req,res,next )=>{
 try{
    const {title,description}=req.body
    
    //    const task =new Task({title});
    //    await task.save();    // alternative one
    
    await Task.create({
        title,
        description,
        user:req.user,
    })
    res.status(201).json({
        success:true,
        message:"Task added Successfully",
    })
    
 } 
 catch(error)
 {
      next(error)
 }
}
export const getMyTask = async (req,res,next) =>{
   try{
    const userid=req.user._id;
 

    const tasks=await Task.find({user:userid})
    res.status(200).json({
        success:true,
        tasks,
    })
   }
catch(error){
    next(error);
}
}

export const updateMyTask = async (req,res,next) =>{
   try{
    const id=req.params.id;
    const task=await Task.findById(id);
   //  console.log(task);
   if(!task)
   return next(new ErrorHandler("Task Not Found",404))
    task.iscompleted=!task.iscompleted;
     
    await task.save();
       res.status(200).json({
           success:true,
           message:"Task Updated",
       })
   }
   catch(error){
    next(error);
   }
}
export const deleteMyTask = async (req,res,next) =>{
   try{
    const task=await Task.findById(req.params.id);
    // console.log(task);
    if(!task)
    return next(new ErrorHandler("Task Not Found",404))
     await task.deleteOne();
       res.status(200).json({
           success:true,
           message:"Task Deleted",
       })
   }
   catch(error)
   {
    next(error)
   }
   }