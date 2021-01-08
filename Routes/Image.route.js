var { cloudinary } = require('../image_server/cloudinary');
var express = require('express')
var multer  = require('multer')
const router = express.Router()
var fs = require('fs');
const RequireLogin = require('../middleware/requireLogin')
require('dotenv').config()

var app = express()

const storage = multer.diskStorage({})

// This route will upload file to cloudinary
router.post('/uploadimage', async (req, res, next) => {
    const upload = multer({ storage }).single('image')
    upload(req, res, function (err) {
        if (err) {
            return res.send(err)
        }
        const path = req.file.path

        cloudinary.uploader.upload(path,
             (image) => { 
                 if (!image) {
                     return res.status(400).send("Upload failed")
                 }
                // remove file from server
                fs.unlinkSync(path)
                // return image url to store in database
                console.log(image.url)
                return res.status(200).send(image.url)
            }
        )
    })
})



module.exports = router;