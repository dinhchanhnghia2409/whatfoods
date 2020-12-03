const express = require("express");
const User = require("../models/User.model");
require('dotenv').config()
const jwt = require("jsonwebtoken");
const checkToken = require('../middleware/checkToken');
const bcrypt = require('bcryptjs')
const router = express.Router();


/*=================================
Chức năng đăng kí
Lấy từ body(dạng json) gửi đến serve
Thành công dữ liệu sẽ lưu vào DB
===================================*/
router.post('/signup', (req, res) => {
  const { phone, email, password, } = req.body

  User.findOne({ phone:phone })
      .then((savedUser) => {
          if (savedUser) {
              return res.status(422).json({ error: "Tài khoản này đã tồn tại!" })
          }
          bcrypt.hash(password, 12)
              .then(hashedpassword => {
                  const user = new User({
                      email,
                      password: hashedpassword,
                      phone,
                  })
                  user.save()
                      .then( 
                          res.json({ message: "Đăng ký thành công" })
                      )
                      .catch(err => {
                          console.log(err)
                      })
              })

      })
      .catch(err => {
          console.log(err)
      })
})

  /*===================================
  Chức năng đăng nhập
  So sánh phone và password từ body gửi đến serve
  Thành công sẽ cung cấp Token 
  ===================================== */
  router.route("/signin").post((req, res) => {
    const {phone,password} = req.body
    User.findOne({ phone }, (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      if (result === null) {
        return res.status(403).json("Sai tài khoản");
      }
      if ( bcrypt.compare(password, result.password)) {
        const token = jwt.sign({_id:result._id }, process.env.key, {expiresIn:'30d'});
  
        res.json({
          token: token,
        });
      } else {
        res.status(403).json("sai mật khẩu");
      }
    });
  });

  module.exports = router;