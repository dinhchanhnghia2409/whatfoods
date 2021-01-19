const { text } = require('express');
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ingredient: {
        type: String,
        require: true,
    },

    recipe:{
        type: String,
        require: true,
    },
    category: {
      type: String,
      require: true,  
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
   
},
{ timestamps: true }) 

const Food = mongoose.model("Food", FoodSchema);


module.exports = Food