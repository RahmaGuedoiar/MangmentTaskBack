const mongoose = require("mongoose")
const TaskSchema=mongoose.Schema(
    {
        title:{type:String,require:true},
        description:{type:String,require:true},
        creation:{type:Date,default:new Date() },
        isDone:{type:Boolean,default:false},
        owner:{
            // id ,lier l'autre schema  collection user
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }


    }
)
const TASK=mongoose.model('task',TaskSchema)
module.exports=TASK