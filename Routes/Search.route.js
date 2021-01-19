const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Food = require('../models/Food.model')
require('dotenv').config()

router.post("/searchuser", async (req,res) => {
    var query = req.body.name;
    console.log(query);
    User.find({
        name: {$regex: req.body.name, $options: "i"},
    }).then((users) => {res.json({users})});
    
});


router.post("/searchfood", async (req,res) => {
    var query = req.body.ingredient;
    console.log(query);
    Food.find({
        ingredient: {$regex: req.body.ingredient, $options: "i"},
    }).then(() => {res.json({foods})});
    
});



module.exports = router;