require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const woroutRouter = require('./routes/workouts')
const userRouter = require('./routes/user')

// express app
const app = express();

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, res.method)
    next()
})

// routers
app.use('/api/workouts', woroutRouter)
app.use('/api/user', userRouter)


// connect to db 
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db &listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })

