//call the packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
//nos sirve para definir las rutas que voy a trabajar en mi aplicacion
var path = require('path')


//APP CONFIGURATION
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Width, content-type, Authorization');
  next();
});

app.use(morgan('dev'));

//connect to our database
mongoose.connect(config.database);

//set static files location fo front end (angular files)
app.use(express.static(__dirname + '/public'));


var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

//main catchall route
//end users to the front end
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/views/index.html'))
});

app.listen(config.port);
console.log('Neo comes over port ' + config.port);
