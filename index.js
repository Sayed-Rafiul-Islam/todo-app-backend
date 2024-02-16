const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))


// Route Imports
const userRouter = require('./routes/userRouter')
const taskRouter = require('./routes/taskRouter')

const verificationRouter = require('./routes/verification')


// Routes 
app.use('/api', userRouter) 
app.use('/api', taskRouter) 
app.use('/api', verificationRouter) 

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const clientOptions = { 
    serverApi: { 
        version: '1', 
        strict: false, 
        deprecationErrors: true 
    } 
}



mongoose.connect(uri, clientOptions)
.then(()=> app.listen(port, () => {
    console.log(`Connected to Database and Listening to port ${port}`)
}))
.catch((err)=> console.log(err))


app.use('/', (req, res, next) => {
    res.send('running...')
})
