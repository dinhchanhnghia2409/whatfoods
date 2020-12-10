const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000;
require('./middleware/requireLogin')

const UserRouter = require('./Routes/User.route')
const ProfileRouter = require('./Routes/Profile.route')
const PostRouter = require('./Routes/Post.route')
const ServerImage = require('./image_server/cloudinary')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./database')

app.use(UserRouter);
app.use(ProfileRouter);
app.use(PostRouter);
app.use(PostRouter);

app.listen(PORT, () => {
    console.log('Server is running in port:' + PORT);
})

app.get('/',(req,res)=>{
    res.send('MyAPI say Hello')
})