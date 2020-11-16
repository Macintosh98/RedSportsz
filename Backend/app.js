const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || '3000';

app.use(logger('dev'));
app.use(cors());


// all environments
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', require('./routes/users'));
app.use('/registereduserdetails', require('./routes/registereduserdetails'));
app.use('/SportDetails', require('./routes/SportDetails'));


app.listen(port);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
console.log("Server Started");
