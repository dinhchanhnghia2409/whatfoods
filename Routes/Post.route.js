const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const RequireLogin = require('../middleware/requireLogin')
const Post = require('../models/Post.model');
require('dotenv').config()


router.post('/createpost',RequireLogin, (req, res) => {
    const {caption, photo} = req.body
    if (!caption || !photo) {
        return res.status(422).json({ error: "Hãy điền đầy đủ thông tin" })
    }
    const post = new Post({
        photo,
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

router.get('/allpost', RequireLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id ")
        .populate("comments.postedBy", "_id ")
        .sort('-createdAt')
        .then((posts) => {
            res.json({ posts })
        }).catch(err => {
            console.log(err)
        })

})






module.exports = router;