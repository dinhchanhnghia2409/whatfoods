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
  const { phone, email, password,name } = req.body

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
                      name,
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
  So sánh phone và password từ body gửi đến server
  Thành công sẽ cung cấp Token 
  ===================================== */
  router.post('/signin', (req, res) => {
    const { phone, password } = req.body
    if (!phone || !password) {
        return res.status(422).json({ error: "Hãy điền đầy đủ thông tin" })
    }
    User.findOne({ phone: phone }) //compare phone client input with phone in database
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Sai tài khoản" })
            }
            bcrypt.compare(password, savedUser.password) //compare password user input with password user registered
                .then(doMatch => {
                    //if successed send to token to authenticate
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_KEY,{expiresIn:'30d'}) //token exits in 30 day
                        res.json({ token});
                    } else {
                        return res.status(422).json({ error: "Sai mật khẩu" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

  module.exports = router;