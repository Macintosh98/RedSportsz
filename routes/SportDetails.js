var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var connection = require('../config/index');



router.post('/getSports',(req,res,next)=>{
  jwt.verify(req.headers['authorization'],toString(req.body.userid),function(err,data){
    if(err){
      res.send({status:403 , msg: 'Forbidden'});
    }else{
  connection.query('SELECT * FROM sports_master',
     function (err, rows) {
      if (err) {
        res.send({status:500 , data:{}});
      } else {
        res.send({status:200 , data: rows, msg: 'getAccounts Successfully'});
      }
    })
  }
})
});


router.post('/getSpetialization',(req,res,next)=>{
  jwt.verify(req.headers['authorization'],toString(req.body.userid),function(err,data){
    if(err){
      res.send({status:403 , msg: 'Forbidden'});
    }else{
      if(req.body.sport_id){
        connection.query('SELECT * FROM specialization_master where sport_id = ?',[req.body.sport_id],
        function (err, rows) {
         if (err) {
           res.send({status:500 , data:{}});
         } else {
           res.send({status:200 , data: rows, msg: 'getAccounts Successfully'});
         }
       })
      }
      else{
        connection.query('SELECT * FROM specialization_master',
        function (err, rows) {
         if (err) {
           res.send({status:500 , data:{}});
         } else {
           res.send({status:200 , data: rows, msg: 'getAccounts Successfully'});
         }
       })
      }

  }
})
});

module.exports = router;
