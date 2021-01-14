const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
require('dotenv').config()

router.post("/searchuser", async (req,res) => {
    var query = req.body.name;
    console.log(query);
    User.find({
        name: {$regex: req.body.name, $options: "i"},
    }).then((users) => {res.json({users})});
    
});



module.exports = router;