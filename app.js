const express = require('express')
const mongoose = require('mongoose')
// const jsonwebtoken = require('jsonwebtoken')
const authRoute = require('./src/routes/auth')
require('dotenv').config()

const app = express()

// For parsing application/json
app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/api/auth', authRoute)

const dbUrl = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.gavbp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('DB Connected');
}).catch((error)=>{
    console.error('DB Connection Error ', error);
});

app.listen(2240, (req, res) => {
    console.log('Server Started')
});
