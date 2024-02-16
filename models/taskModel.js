const mongoose = require("mongoose")

const Schema = mongoose.Schema

const taskSchema = new Schema({
    taskName : {
        type : String,
        required : true
    },
    taskDescription : {
        type : String,
        required : true
        
    },
    status : {
        type : Boolean,
        required : true,
        default : false
        
    },
    assignedBy : {
        type : String,
        required : true
        
    },
    assignedTo : {
        type : String,
        required : true
    }
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task