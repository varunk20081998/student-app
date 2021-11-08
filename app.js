var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('./db/mongoose')
var hbs = require('hbs')

var homeRouter = require('./routes/home');
var upload_marksRouter = require('./routes/upload-marks');
var view_marks = require('./routes/view-marks');
var leave = require('./routes/leave');
var indexRouter = require('./routes/index');

var signupRouter=require('./routes/signup');
var signinRouter=require('./routes/signin');

const session=require("express-session")
const MongoDBSession=require('connect-mongodb-session')(session)
const mongouri="mongodb://127.0.0.1:27017/test2"
const store=new MongoDBSession({
  uri:mongouri,
  collection:"mysession"
})



var app = express();


app.use(
  session({
      secret:"my first session",
      resave:false,
      saveUninitialiazed:false,
      store:store
  })
)

// view engine setup
 
var partial = path.join(__dirname,'/partials')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(partial)

//app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/home', homeRouter);
app.use('/signup',signupRouter);
app.use('/signin', signinRouter)
app.use('/upload-marks', upload_marksRouter);
app.use('/view-marks', view_marks);
app.use('/leave', leave);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
