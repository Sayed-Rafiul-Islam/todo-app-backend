const { getUsers, login, signupUser, createUser, removeUser, updateRole } = require('../controllers/userController')

const router = require('express').Router()

router.post('/signupUser', signupUser)
router.post('/login', login)
router.get('/getUsers', getUsers)
router.post('/createUser', createUser)
router.delete('/removeUser', removeUser)
router.patch('/updateRole', updateRole)


module.exports = router