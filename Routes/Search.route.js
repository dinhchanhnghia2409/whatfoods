const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
require('dotenv').config()

router.get("/searchuser", async (req,res) => {
    const query = "^" + req.query.name + "$";
    console.log(query.toString());
    const fountUser = await User.find({
        name: {$regex: req.query.name, $options: "i"},
    });
    if (!fountUser) return res.status(000).send({message: "khong tim thay"});
    res.status(200).send(fountUser);
});




module.exports = router;