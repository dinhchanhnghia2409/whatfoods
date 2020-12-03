const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User.model')
module.exports = (req, res, next) => {
    const { authorization } = req.headers
        //authorization === Bearer ewefwegwrherhe
    if (!authorization) {
        return res.status(401).json({ error: "Bạn chưa đăng nhập" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.key, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "Bạn chưa đăng nhập" })
        }

        const { _id } = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next()
        })


    })
}
