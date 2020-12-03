const express = require('express')
const app = express();
const port = 3000  


app.get('/',(req,res)=>{
    res.send('What Food')
})

app.get('/user',(req,res)=>{
    res.send('User')
})

app.listen(process.env.PORT,()=>{

});