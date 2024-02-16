
const router = require('express').Router()

const { createTask, getTaskById, getAssignedTasks, updateTask, removeTask, getMyTasks, updateMyTask } = require('../controllers/taskController')


router.post('/createTask', createTask)
router.get('/getTaskById', getTaskById)
router.get('/getAssignedTasks', getAssignedTasks)
router.get('/getMyTasks', getMyTasks)
router.patch('/updateTask', updateTask)
router.patch('/updateMyTask', updateMyTask)
router.delete('/removeTask', removeTask)
// router.get('/inventoryItem', getOneItem)

module.exports = router