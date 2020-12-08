const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const RequireLogin = require('../middleware/requireLogin')
const Post = require('../models/Post.model');
require('dotenv').config()


router.post('/createpost',RequireLogin, (req, res) => {
    const {caption, image} = req.body
    if (!caption || !image) {
        return res.status(422).json({ error: "Hãy điền đầy đủ thông tin" })
    }
    const post = new Post({
        image,
        caption,
        postedBy: req.user
    })
    post.save().then(result => {
            res.json({ post: result })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;