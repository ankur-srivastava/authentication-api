const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Myuser = require('../models/myusers')
const authMiddleware = require('../../middleware')
require('dotenv').config()

const router = express.Router()

const tokenSecret = process.env.JWT_SECRET

router.post('/login', (req, res) => {
    Myuser.findOne({email: req.body.email}).then(user=>{
        if(!user) res.status(403).json({error: 'Email issue'})
        else {
            bcrypt.compare(req.body.password, user.password, (error, match)=>{
                if(error) res.status(500).json(error)
                else if(match) res.status(200).json({token: generateToken(user._id)})
                else if(!match) res.status(403).json({error: 'Credentials dont match'})
            })
        }
    }).catch(error=>{
        res.status(500).json(error)
    })
})

router.post('/signup', (req, res)=>{
    const rounds = 10
    console.log('In /signup')
    console.log('Request - ', req.body)
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if(error) res.status(500).json(error)
        else {
            const newUser = Myuser({email: req.body.email, password: hash})
            newUser.save().then((user) => {
                console.log(user)
                res.status(200).json({token: generateToken(user._id)})
            }).catch((error) => {
                res.status(500).json(error)
            })
        }
    })
})

function generateToken(user) {
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}

router.get('/jwt-test', authMiddleware.verify, (req, res) => {
    res.status(200).json(req.user)
})

module.exports = router
