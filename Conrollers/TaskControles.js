const TASK=require('../modles/TaskSchema')
const createTask=async(req,res)=>{
    try {
      const {title,description,userId}=req.body  
      const newTask=await TASK.create({title,description,owner:userId})
      res.status(201).json({msg:"Task created",newTask})
    } catch (error) {
        res.status(500).json({msg:"somthing went wrong"})
        console.log(error)
    }
}
const getTask=async(req,res)=>{
    try {
      const {userId}=req.body  
      // owener =userId
      const Tasks=await TASK.find({owner:userId})
      res.status(201).json({msg:"get Tasks",Tasks})
    } catch (error) {
        res.status(500).json({msg:"somthing went wrong"})
        console.log(error)
    }
}
const deleteTask=async(req,res)=>{
    try {
     
      const Tasks=await TASK.findByIdAndDelete({_id:req.params.id})
      res.status(201).json({msg:" Tasks deleted",Tasks})
    } catch (error) {
        res.status(500).json({msg:"somthing went wrong"})
        console.log(error)
    }
}
const updateTask=async(req,res)=>{
    try {
     
      const updateTasks=await TASK.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
      res.status(201).json({msg:" Tasks updated",updateTask})
    } catch (error) {
        res.status(500).json({msg:"somthing went wrong"})
        console.log(error)
    }
}
module.exports={createTask,getTask,deleteTask,updateTask}