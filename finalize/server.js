const express = require('express');
const app=express();

const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://0.0.0.0:27017/test',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
     
    }
)
.then(() => console.log('DB Connection Successfull'))
.catch((err) => {
    console.error(err);
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/front.html");
});

app.get("/exam",(req,res)=>{
    res.sendFile(__dirname+"/exam.html");
});

app.listen(3000,()=>{console.log('connection 3000')})