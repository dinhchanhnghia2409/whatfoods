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
        type: text,
        require: true,
    },

    recipe:{
        type: text,
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