const mongoose = require('mongoose');
require('dotenv').config();

const address = "mongodb+srv://dinhchanhnghia:Nghiadaica123.@cluster0.rfqvp.mongodb.net/<WhatFood>?retryWrites=true&w=majority" || process.env.DB;

mongoose.connect(address, {
    useCreateIndex: true,
}).then(() => console.log('Kết nối thành công tại ' + address));