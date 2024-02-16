const { getUsers, createUser, login, getUser } = require('../controllers/userController')

const router = require('express').Router()

router.post('/createUser', createUser)
router.post('/login', login)
router.get('/getUsers', getUsers)


module.exports = router