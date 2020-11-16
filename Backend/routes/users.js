var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var connection = require('./config/index')
var nodemailer = require('nodemailer');
var uuid = require('uuid');

router.post('/validateUser', function(req, res, next) {
  connection.query('SELECT * from user_details where email = ? and password = ? ',
    [req.body.username,req.body.password],
     function (err, rows) {
      if (err) {
        res.send({status:500 , data:{}, valid_user:false});
      } else {
        if(typeof rows != 'undefined' &&  rows != '' &&  rows != null) {
          var token = jwt.sign(JSON.stringify(rows[0]), toString(rows[0].id));
          res.send({status:200 , data:rows[0], valid_user:true,token:token});
        }else{
          res.send({status:500 , data:{}, valid_user:false});
        }
      }
  })
});

router.post('/forgetPassword', function(req, res, next) {
  connection.query('SELECT * from user_details where email = ?',
    [req.body.email],
     function (err, rows) {
      if (err) res.send({status:500 , data:{"error":"mail not found"}});
      else {
        if(typeof rows != 'undefined' &&  rows != '' &&  rows != null) {

          var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
              user: '',
              pass: ''
            }
          });
          var d = new Date();
          var link="http://localhost:8080/#/forgot-password/"+uuid.v4()+"$"+rows[0].id+"$"+d.getHours()+"-"+d.getMinutes()+"$"+d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()
          var mailOptions = {
            from:'',
            to: req.body.email,   
            subject: 'Forgot Password Request',
            html: `<p>Hi,<br/>
                  Please click on link: <a href=`+link+`></a><br/>
                  Link will be valid till 20 mins <br>Thanks,<br/>
                  Team AB SoftWorld </p>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.send({status:500 , data:{}});
            } else {
              console.log('Email sent: ' + info.response);
              res.send({status:200 , data:{}});
            }
          });

        }else{
          res.send({status:500 , data:{}});
        }
      }
  })
});

router.post('/resetPassword', function(req, res, next) {
  if(req.body.changePassword){
      connection.query('SELECT * from user_details where id = ? ',
      [req.body.userid],
      function (err, rows) {
        if (err) res.send({status:500 , data:{}});
        else {
          if(typeof rows != 'undefined' &&  rows != '' &&  rows != null) {
            if(rows[0].password==req.body.oldpassword){
              connection.query('UPDATE user_details SET password = ? where id = ?',
              [req.body.password,req.body.userid],
              function (err, rows) {
                if (err) res.send({status:500 , data:{}});
                else {
                  if(typeof rows != 'undefined' &&  rows != '' &&  rows != null) 
                    res.send({status:200 , data:{}});
                  else res.send({status:500 , data:{}});
                }
              })
            }else res.send({status:500 , data:{}});
          }else res.send({status:500 , data:{}});
        }
    })
  }else if(req.body.forgotPassword){
      connection.query('UPDATE user_details SET password = ? where id = ?',
      [req.body.password,req.body.userid],
      function (err, rows) {
        if (err) res.send({status:500 , data:{}});
        else {
          if(typeof rows != 'undefined' &&  rows != '' &&  rows != null) 
            res.send({status:200 , data:{}});
          else res.send({status:500 , data:{}});
        }
    })
  }
});

router.post('/registerSport', function(req, res, next) {
  jwt.verify(req.headers['authorization'],toString(req.body.userid),function(err,data){
    if(err){
      res.send({status:403 , msg: 'Forbidden'});
    }else{
      var a = connection.query('INSERT INTO user_sport_mapping '+
      '( user_id, sport_id, years_age, months_age, specialization_id, '+
      'is_active, created_date, updated_date ) '+
      'VALUES (?,?,?,?,?,1,now(),now()) ',
      [req.body.userid, req.body.sport, req.body.years, req.body.months, req.body.spetialization],
      function (err, rows) {
        if(err){
          res.send({status:500 , data:err});
        }else{
          res.send({status:200 , data: rows, msg: 'User Registered Successfully'});
        }
      })
    }
  })
});

module.exports = router;