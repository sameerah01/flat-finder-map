var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname);
  }
})

var upload = multer({storage: storage, limits: {fileSize: 50 * 1024 * 1024}});

var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var LocationModel = require('./models/userLocation')

var app = express();
const dbURI = "mongodb+srv://sameer-db:ahamed1MO@cluster0.gyoprnc.mongodb.net/userLocationDB?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended : true}));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static('uploads'));
app.use('/', indexRouter);
app.post('/postUserData', upload.array('propImage'), (req,res) => {
  const userData = new LocationModel({
    name: req.body.name,
    telephone: req.body.telephone,
    email: req.body.email,
    propImage: req.files,
    rentalType: req.body.rentalType,
    lat: req.body.lat,
    lng: req.body.lng
  })
  userData.save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})
app.get('/getUserData', (req,res) => {
  LocationModel.find()
    .then((results) => res.send(results))
    .catch((err) => console.log(err))
})
app.put('/updateUserData',upload.array('propImage'), (req, res) => {
  var query = {_id: req.body._id};
  var updatedData = {
    name: req.body.name,
    telephone: req.body.telephone,
    email: req.body.email,
  };
  req.files.length ? updatedData = {...updatedData, propImage : req.files} : null;
  LocationModel.findOneAndUpdate(query, updatedData, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send('Succesfully saved.');
  });
})
app.delete('/deleteUserData/:id', (req, res) => {
  console.log('reqSS', req.params);
  LocationModel.deleteOne({_id: req.params.id})
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

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
