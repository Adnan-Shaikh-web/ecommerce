const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('dotenv').config();

const userRoute = require('./routes/userRoute')
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: '*'
}))

app.use('/user', userRoute)


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to mongo db')
    app.listen(3000, () => { console.log('server is running') })
})