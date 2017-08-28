var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var db = require('./db');
var routes = require('./routes/arkRoutes');
var Dinos = require('./controllers/dinoController');
var cookieParser = require('cookie-parser')


app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://nathanwmarsh.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
routes(app);
//app.use('/dinos', require('./controllers/dinoController'));


db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log("Unable to conenct to MySQL.");
    process.exit(1);
  } else {
    app.listen(port, '127.0.0.1', function() {
      console.log("... port %d in %s mode", port, app.settings.env);
    });
  }
});