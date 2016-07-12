var express = require('express');
var app = express();
//nos sirve para definir las rutas que voy a trabajar en mi aplicacion
var path = require('path')
var adminRouter = express.Router();
var externalRouter = express.Router();
//var publicRouter = express.Router();

app.get('/', function(request, responsse){
  response.sendFile(path.join(__dirname) + '/index.html');
});

//Middleware
//mas generico, para toda la aplicacion
adminRouter.use(function (req, res, next){
  console.log('------->', req.method, req.url);
  next();
});
//estos trabajan a nivel de parametro
adminRouter.param('name', function (req, res, next, name){
  console.log('req.name: ', req.name);
  console.log('name: ', name);
  req.name = 'Mr. robot wa here!';
  next();
});

externalRouter.param('username', function(req, res, next, username){
  if(username === 'mrrobot'){
    req.username = 'jose';
    next();
  }else{
    res.redirect('/external/error');
  }
});

externalRouter.param('password', function(req, res, next, password){

  if(password === '123456'){
    next();
  }else{
    res.redirect('/external/error');
  }
});

//Rutas
//adminRouter
adminRouter.get('/', function(req, res){
  res.send('Estoy en la pagina principal del admin');
});

adminRouter.get('/users', function(req, res){
  console.log('Ya llegue a la vista de usuarios');
  res.send('Aqui se mostraran los usuarios');
});

adminRouter.get('/users/:name', function(req, res){
  //res.send('Hola ' + req.params.name);
  res.send('Hola ' + req.name);
});

adminRouter.get('/posts', function(req, res){
  res.send('Aqui se mostraran los articulos');
});


//externalRouter
externalRouter.get('/login/:username/:password', function(req, res){
    res.send('Congratulations ' + req.username + ', you entered!!');
});

externalRouter.get('/error', function(req, res){
  res.send('You are not allowed to enter this site. Get out!!')
});

app.use('/admin', adminRouter);
app.use('/external', externalRouter);

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));

console.log('Here we go!');
