var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var connection = require('./config/index')
var uuid = require('uuid');


router.post('/getRegisteredUserList', function(req, res, next) {
  jwt.verify(req.headers['authorization'],toString(req.body.userid),function(err,data){
    if(err){
      res.send({status:403 , msg: 'Forbidden'});
    }else{
      if(req.body.months!=""){
        var e=new Date();
        var getDate =e.getDate()
        var getMonth =e.getMonth()+1
        var getFullYear =e.getFullYear()

        var y=e.getFullYear(),m=e.getMonth()-req.body.months
        if(m<=0){
          m=m+12
          y=y-1
        }
        
        var a = connection.query("SELECT * from (user_sport_mapping Inner join user_details on user_details.id=user_sport_mapping.user_id )  where user_details.role='user' and user_sport_mapping.created_date between '"+y+"-"+m+"-"+ getDate+"' and '"+ getFullYear+"-"+ getMonth+"-"+ getDate+"'",
          function (err, rows) {
            if (err) {
              res.send({status:500 , data:a.sql});
            } else {
                res.send({status:200 , data: rows, msg: 'List Fetched Successfully ',sql:a.sql}); 
            }
        })
      }else{
        var a = connection.query("SELECT * from (user_sport_mapping Inner join user_details on user_details.id=user_sport_mapping.user_id )  where user_details.role='user'",
          function (err, rows) {
            if (err) {
              res.send({status:500 , data:{}});
            } else {
              if(typeof rows != 'undefined' &&  rows != '' &&  rows != null) {
                res.send({status:200 , data: rows, msg: 'List Fetched Successfully'}); 
              }else{
                res.send({status:500 , data:{}});
              }
            }
        })
      }
}
})
});


router.post('/contact', function(req, res, next) {
            var a = connection.query('INSERT INTO  contact_details '+
            ' (	name, email, message, added_on)'+
            'VALUES (?,?,?,now())',
            [req.body.cname, req.body.cemail, req.body.cmessage],
            function (error, innerRows) {
              console.log(a.sql)
              if(error){
                  res.send({status:500 , data:error});
              }else{
                  res.send({status:200 , data: innerRows, msg: ' Added Successfully'});
              }
            })
});


router.post('/upload', function(req, res, next) {
  const birthdate=new Date(req.body.date);
  var getDate =birthdate.getDate()
  var getMonth =birthdate.getMonth()+1
  var getFullYear =birthdate.getFullYear()
  if(req.body.update){
    jwt.verify(req.headers['authorization'],toString(req.body.userId),function(err,data){
      if(err){
        res.send({status:403 , msg: 'Forbidden'});
      }else{
          // if (req.files != null) {
          //   var imageName=req.body.profile+".jpg"
          //   const file = req.files.file;
          //   if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/jpg" ){                                 
          //       file.mv(`${__dirname}/../public/uploads/${imageName}`, err => {
          //           if (err) {
          //             console.error(err);
          //             res.send({status:500 , data:{msg:"Image Not Uploaded"}});
          //           }
          //       });
          //   } else {
          //       message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
          //       res.send({status:500 , data:{msg:message}});
          //   }
          // }

          var s="UPDATE user_details SET "+
          "email='"+req.body.email +"', mobile='"+ req.body.mobileNo+"', alternate_mobile='"+ req.body.alternateMobileNo+
          "',first_name='"+ req.body.firstName+"', middle_name='"+ req.body.middleName+"', last_name='"+req.body.lastName +"', address='"+req.body.address +"', city='"+ req.body.city+"', state='"+ req.body.state+"', zip_code='"+ req.body.zip+"', date_of_birth='"+ getDate+
          "',month_of_birth='"+ getMonth+"', year_of_birth='"+ getFullYear+"',modified_at =now() where id='"+req.body.userid+"'"
          var a = connection.query(s,function (err, rows) {
            if (err) {
              res.send({status:500 , data:{error:err}});
            } else {
              res.send({status:200 , data: rows, msg: 'User Updated Successfully'});
            }
          })
      }
    })

      
   
  }
  else{
    const profileID=uuid.v4();
    // if (req.files != null) {
    //   var file = req.files.file;
    //   var imageName=profileID+".jpg"
    //   var imageSize="20X20"
    //   var imageUrl="http://localhost:3000/uploads/"+imageName
    //   if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/jpg" ){                                 
    //       file.mv(`${__dirname}/../public/uploads/${imageName}`, err => {
    //         if (!err) {
    //           var sql = "INSERT INTO `user_profiles`(`id`,`size`,`image`,`url`) VALUES ('" + profileID + "','" + imageSize + "','" + imageName + "','" + imageUrl + "')";
    //           var query = connection.query(sql);
    //         }
    //       });
    //   }
    // }

    var a = connection.query('INSERT INTO  user_details '+
    '( profile, email, password, mobile, alternate_mobile, ' +
    'first_name, middle_name, last_name, address, city, state, zip_code, date_of_birth, '+
    'month_of_birth, year_of_birth, role, is_active, is_blocked, last_login, created_at,modified_at ) '+
    'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,0,now(),now(),now()) ',
    [profileID, req.body.email, req.body.password, 
      req.body.mobileNo, req.body.alternateMobileNo, req.body.firstName , req.body.middleName, 
      req.body.lastName,req.body.address,req.body.city, req.body.state, req.body.zip , getDate, getMonth,
      getFullYear,req.body.role],
    function (err, rows) {
      if (err) {
        res.send({status:500 , data:{sql:a.sql,msg:"Enter Corrent Information"}});
      } else {
        res.send({status:200 , msg: 'User Registered Successfully'});
      }
    })

  }

});


router.post('/submitRegisteredUser', function(req, res, next) {
  jwt.verify(req.headers['authorization'],toString(req.body.userid),function(err,data){
    if(err){
      res.send({status:403 , msg: 'Forbidden'});
    }else{
      var a = connection.query('SELECT * from user_details where id = ?',[req.body.userid],
        function (err, rows) {
          if (err) res.send({status:500 , data:{}});
          else {
            if(typeof rows != 'undefined' &&  rows != '' &&  rows != null) {

              if(req.body.block==true){
                  var s="UPDATE user_details SET is_blocked='1', is_active='0' where id='"+req.body.userid+"'"
                  connection.query(s,function (err, rows) {
                    if (err) res.send({status:500 , data:{error:err}});
                    else res.send({status:200 , data: rows, msg: 'block User Updated Successfully'});
                  })
              }else if(req.body.verify==true){
                  var s="UPDATE user_details SET is_blocked='0', is_active='1' where id='"+req.body.userid+"'"
                  connection.query(s,function (err, rows) {
                    if (err) res.send({status:500 , data:{error:err}});
                    else res.send({status:200 , data: rows, msg: 'verify User Updated Successfully'});
                  })
              }else res.send({status:200 , data:{rows}});

            }else{
              res.send({status:500 , data:{}});
            }
          }
      })
    }
  })
});



module.exports = router;