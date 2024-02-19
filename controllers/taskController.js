const { ObjectId } = require('mongodb')
const Task = require('../models/taskModel')


const createTask = async (req,res) => {
    try {
        const data = req.body
        const task = {...data, assignedDate : new Date()}
        const newTask = await Task.create(task)
        res.status(200).send(newTask)
    } catch (error) {
        res.status(500).send(error)
    }
}


const updateTask = async (req,res) => {
    try {
        const data = req.body
        const filter = { _id : data.taskId}
        await Task.updateOne(filter,data,{new : true})
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateMyTask = async (req,res) => {
    try {
        const {_id,status,comment} = req.body
        const filter = {_id}
        const data = {status,comment}
        await Task.updateOne(filter,data,{new : true})
        const updatedTask = await Task.findOne(filter)
        res.status(200).send(updatedTask)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getTaskById = async (req,res) => {  
    try {
        const {taskId} = req.query
        if (!ObjectId.isValid(taskId)) {
            res.status(200).json(null)
        } else {
            const task = await Task.find({_id : taskId})
            res.status(200).json(task)
        }

    } catch (error) {
        res.status(500).send(error)
    }
}

const getAssignedTasks = async (req,res) => {  
    try {
        const {email} = req.query
        const tasks = await Task.find({assignedBy : email}).sort({ assignedDate : -1})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getMyTasks = async (req,res) => {  
    try {
        const {email} = req.query
        const tasks = await Task.find({assignedTo : email}).sort({ assignedDate : -1})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
}

const removeTask = async (req,res) => {
    try {
        const {taskId} = req.query
        const filter = {_id : taskId}
        await Task.deleteOne(filter)
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    createTask,
    getTaskById,
    getAssignedTasks,
    updateTask,
    removeTask,
    getMyTasks,
    updateMyTask
}