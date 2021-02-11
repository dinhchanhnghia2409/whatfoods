const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path');
const PORT = process.env.PORT || 3000;
require('./middleware/requireLogin')
app.use('/css',express.static(__dirname+''))

const UserRouter = require('./Routes/User.route')
const ProfileRouter = require('./Routes/Profile.route')
const PostRouter = require('./Routes/Post.route')
const ServerImage = require('./Routes/Image.route')
const SearchRouter = require('./Routes/Search.route')
const bodyParser = require('body-parser');
const { patch } = require('./Routes/User.route');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./database')

app.use(UserRouter);
app.use(ProfileRouter);
app.use(PostRouter);
app.use(ServerImage);
app.use(SearchRouter);


app.use(express.static('public'));


app.listen(PORT, () => {
    console.log('Server is running in port:' + PORT);
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/views/index.html')
})