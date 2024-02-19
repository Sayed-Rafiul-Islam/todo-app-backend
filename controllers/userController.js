const User = require('../models/userModel')
const { createJwt } = require('../utils/varifyJWT')
const { encode } = require('../utils/cypher')
const bcrypt = require('bcrypt');


const getUsers = async (req,res) => {  
    try {
        const users = await User.find()
        res.status(200).send(users.reverse())
    } catch (error) {
        res.status(500).send(error)
    }
}

// login

const login = async (req,res) => {
    try {
        const {email,password} = req.body
        const currentDate = new Date()

        const isUser = await User.findOne({ email : email})
        
        if (!isUser) {
            res.status(404).send({accessToken : null})
        } 
        else {
            const data = {email, name : isUser.userName, role : isUser.role,  date : currentDate}
            bcrypt.compare(password,isUser.pass_word,async (err,result)=>{
                if (result) {
                    const token = await createJwt(data)
                    res.status(200).send({accessToken : token,email, role : isUser.role})
                } else {
                    res.status(400).send({accessToken : null})
                }

            })
            
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

// Create new Admin


const signupUser = async (req,res) => {
    try {
        const {name,email,password,role} = req.body;

        const currentDate = new Date()
        const data = {userName : name, email, role, date : currentDate}
        const token = await createJwt(data)
        const pass_word = await encode(password)

        const isUser = await User.findOne({ email : email})

        const x = isUser ? true : false 


        if (x) {
            res.status(400).send({accessToken : null})
        } else {
            await User.create({
                userName : name,
                email,
                pass_word,
                role
            })
            res.status(200).send({accessToken : token, email, role})
        }         

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
}
const updateRole = async (req,res) => {
    try {
        const {role,_id} = req.body;
        const filter = {_id}
        const data = {role}
        await User.updateOne(filter,data,{new : true})
        const updatedUser = await User.findOne(filter)
        res.status(200).send(updatedUser)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
}
const createUser = async (req,res) => {
    try {
        const {name,email,password,role} = req.body;
        const pass_word = await encode(password)

        const newUser = await User.create({
            userName : name,
            email,
            pass_word,
            role
        })
        res.status(200).send(newUser)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
}
const removeUser = async (req,res) => {
    try {
        const {_id} = req.query;
        const deletedUser = await User.find({_id})
        await User.deleteOne({_id})
        res.status(200).send(deletedUser[0])

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
}

// export

module.exports = {
    getUsers,
    createUser,
    login,
    signupUser,
    removeUser,
    updateRole
}