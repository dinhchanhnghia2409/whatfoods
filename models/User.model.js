const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*=========================================
User bao gồm 3 trường username,password,email
username : bắt buộc , không trùng
password : bắt buộc 
email : bắt buộc , không trùng
===========================================*/
const User = Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 
});

module.exports = mongoose.model("User", User);