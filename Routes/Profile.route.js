const express = require("express");
const Profile = require("../models/Profile.model");
const User = require("../models/User.model")
require('dotenv').config()
const checkToken = require('../middleware/checkToken');

const router = express.Router();


router.get('/user/me', checkToken, (req, res) => {
  res.json(req.user)
})

router.get('/user/:id', checkToken, (req, res) => {
  User.findOne({ _id: req.params.id })
      .select("username")
      .then(user => {
          res.json(user.username);
      }).catch(err => {
          return res.status(404).json({ error: "Người dùng không tồn tại" })
      })
})

module.exports = router;