const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
// var mysql = require('mysql');
const path =require('path')
const app= express();

app.use(bodyParser.json());


// app.use('/users', require('./routes/users'));
// app.use('/registereduserdetails', require('./routes/registereduserdetails'));
// app.use('/SportDetails', require('./routes/SportDetails'));


// if(process.env.NODE_ENV == "production"){

    app.use(express.static("client/build"));

    app.get("*",(req,res)=>{
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
// }


const port= process.env.PORT || 5000;

app.listen(port,()=>{ console.log(`server started on port ${port}`)});