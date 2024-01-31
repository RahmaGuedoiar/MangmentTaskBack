const express=require('express')
const router =express.Router()
const userMiddelware=require("../middleware/UserMiddleware")
const {createTask,getTask,deleteTask,updateTask}=require('../Conrollers/TaskControles')
router.post("/createTask",userMiddelware,createTask)
router.get("/getTasks",userMiddelware,getTask)
router.delete("/deleteTask/:id",userMiddelware,deleteTask)
router.put("/updateTask/:id",userMiddelware,updateTask)
module.exports=router