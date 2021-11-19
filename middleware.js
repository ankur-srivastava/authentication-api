const jwt = require('jsonwebtoken')
require('dotenv').config()

const tokenSecret = process.env.JWT_SECRET

function verify(req, res, next) {
    const token = req.headers.authorization
    if(!token) res.status(403).json({error: "Please provide the token"})
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if(err) res.status(500).json({error: 'Failed to authenticate token'})
            console.log('After verifying the token ', value.data)
            req.user = value.data
            next()
        })
    }
}

module.exports = { verify }
