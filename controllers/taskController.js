const { ObjectId } = require('mongodb')
const Task = require('../models/taskModel')


const createTask = async (req,res) => {
    try {
        const data = req.body
        const newTask = await Task.create(data)
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
        const {_id,status} = req.body
        const filter = {_id}
        const data = {status}
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
        const tasks = await Task.find({assignedBy : email})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getMyTasks = async (req,res) => {  
    try {
        const {email} = req.query
        const tasks = await Task.find({assignedTo : email})
        console.log(tasks)
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

// get all inventory items

// const getInventory = async (req,res) => {  
//     try {
//         const page = req.query.page
//         const inventory = await Inventory.find({})
//         res.status(200).send(inventory.reverse().slice(10*page,10*(page+1)))
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }

// // get the inventory items page count

// const getInventoryPageCount = async (req,res) => {
//     try {
//         const inventory = await Inventory.find({})
//         const pageCount = Math.ceil(inventory.length / 10)
//         res.status(200).json(pageCount)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }
// // get one item from inventory 

// const getOneItem = async (req,res) => {
//     try {
//         const id = req.query.id
//         const item = await Inventory.findOne({_id : id})
//         res.status(200).send(item)
//     } catch (error) {
//         res.status(500).send(error)
//     }
    
// }
// // delete one item from inventory 

// const deleteItem = async (req,res) => {
//     try {
//         const id = req.query.id
//         await Inventory.deleteOne({_id : id})
//         res.status(200).json()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }

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