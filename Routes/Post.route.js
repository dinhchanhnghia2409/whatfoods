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
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort('-createdAt')
        .then((posts) => {
            res.json({ posts })
        }).catch(err => {
            console.log(err)
        })

})


router.get('/mypost', RequireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("PostedBy", "_id name")
        .then(mypost => {
            res.json({ mypost })
        })
        .catch(err => {
            console.log(err)
        })
})

router.delete('/deletepost/:postId', RequireLogin, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(
                        res.json('Xóa bài thành công!')
                    ).catch(err => {
                        console.log(err)
                    })
            }
        })
})




module.exports = router;