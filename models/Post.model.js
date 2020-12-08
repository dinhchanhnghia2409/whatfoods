const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const PostSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{comment: {text: String, postedBy: { type: ObjectId, ref: "User" }}}],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
},
{ timestamps: true }) //??

const Post = mongoose.model("Post", PostSchema);


module.exports = Post