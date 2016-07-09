var express = require('express');
var app = express();
//nos sirve para definir las rutas que voy a trabajar en mi aplicacion
var path = require('path')

app.get('/', function(request, response){
  response.sendFile(path.join(__dirname) + '/index.html');
});

app.set('port', (process.env.PORT || 5000));
app.listen(1337);

console.log('Here we go!');
