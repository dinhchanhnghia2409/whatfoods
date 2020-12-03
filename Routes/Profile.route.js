const express = require("express");
const User = require("../models/User.model")
require('dotenv').config()
const requieLogin = require('../middleware/requireLogin');

const router = express.Router();


router.get('/user/me', requieLogin, (req, res) => {
  res.json(req.user)
})

router.get('/user/:id', requieLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
      .select("username")
      .then(user => {
          res.json(user.username);
      }).catch(err => {
          return res.status(404).json({ error: "Người dùng không tồn tại" })
      })
})

module.exports = router;