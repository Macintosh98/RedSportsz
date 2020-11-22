const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
// var mysql = require('mysql');

const app= express();

app.use(bodyParser.json());

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'redsportsz'
// })

// connection.connect(function(err) {
//     if (err) throw err;
//     else console.log("DB connected...");
// });
app.use('/users', require('./routes/users'));
app.use('/registereduserdetails', require('./routes/registereduserdetails'));
app.use('/SportDetails', require('./routes/SportDetails'));


const port= process.env.PORT || 5000;

app.listen(port,()=>{ console.log(`server started on port ${port}`)});