const express = require("express");
const User = require("../models/User.model")
require('dotenv').config()
const requireLogin = require('../middleware/requireLogin');
const router = express.Router();


router.get('/user/me', requireLogin, (req, res) => {
  res.json(req.user)
})

router.get('/user/:id', requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
      .select("-password")
      .then(user => {
          res.json(user);
      }).catch(err => {
          return res.status(404).json({ error: "Người dùng không tồn tại" })
      })
})

router.put('/user/me/update', requireLogin, (req, res) => {
  User.findByIdAndUpdate(
      req.user._id,
      {
          $set: 
          { 
          name: req.body.name,
          email: req.body.email,
          bio: req.body.bio
          } 
      },
      { new: true },
      (err, result) => {
          if (err) {
              return res.status(422).json({ error: "Không thể Edit" })
          }
          res.json(result)
      })
})

module.exports = router;