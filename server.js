//call the packages
var express = require('express');
var app = express();
//nos sirve para definir las rutas que voy a trabajar en mi aplicacion
var path = require('path')
var adminRouter = express.Router();
var externalRouter = express.Router();
//var publicRouter = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = require('./db/user');
var Pokemon = require('./db/pokemon');

var superSecret = 'strangeThingsHappenedInArea51';

var port = process.env.PORT || 5000;

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

//
app.use(morgan('dev'));

if(port == 5000){
  mongoose.connect('mongodb://localhost/pokemon');
}else {
  mongoose.connect('mongodb://admin:admin@ds023105.mlab.com:23105/pokemon');
}


//API ROUTES
//Main/basic route
app.get('/', function(req, res){
  res.send('Welcome to the real world');
});

//Express router instance
var apiRouter = express.Router();

//Accesed at GET http://localhost:5000/api
apiRouter.get('/', function(req, res){
  // res.json({ message: 'Stop to try hit me and hit me!' });
  res.json({ message: 'Welcome to Zion! (Our mother API)' });
});

apiRouter.post('/authenticate', function(req, res){
  User.findOne({
    username: req.body.username,
  })
  .select('name username password')
  .exec(function(err, user){
    if(err){
      throw err;
    }
    //Username was not found
    if(!user){
      res.json({
        success: false,
        message: 'La autenticacion ha fallado. El usuario NO existe.'
      })
    } else if (user) {
      //validate if password matches
      var validPassword = user.comparePassword(req.body.password);

      if(!validPassword){
        res.json({
          success: false,
          message: 'La autenticacion ha fallado. Contrasenia incorrecta'
        });
      }else{
        //If authenticate process is ok, then generate a token
        res.json({
          success: true,
          message: 'Swordfish: Acceso Autorizado'
        });
      }
    }
  });
});

//ROutes /users
apiRouter.route('/users')
//Create a user through post
//URL: http:localhost:5000/api/users
.post(function(req, res){
  var user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;

  user.save(function(err){
    //Verify duplicate entry on username
    if(err){
      if(err.code == 11000){ //mongo
        console.log(err);
        return res.json({success: false, message: 'El nombre es duplicado' })
      }
    }

    res.json({message: 'El usuario se ha creado'});
  });
})
//Create a user through get
//URL: http:localhost:5000/api/users
.get(function(req, res){
  User.find(function(err, users){
    if(err){
      return res.send(err);
    }

    res.json(users);
  });


});

apiRouter.route('/users/:user_id')
.get(function(req, res){
  User.findById(req.params.user_id, function(err, user){
    if(err){
      return res.send(err);
    }
    res.json(user);
  });
})
.put(function(req, res){
  User.findById(req.params.user_id, function(err, user){
    if(err){
      return res.send(err);
    }
    if(req.body.name){
      user.name = req.body.name;
    }
    if(req.body.username){
      user.username = req.body.username;
    }
    if(req.body.password){
      user.password = req.body.password;
    }

    user.save(function(err){
      if(err){
        return res.send(err);
      }

      res.json({message: 'Usuario actualizado'});
    });
  });
})
.delete(function(req, res){
  User.findByIdAndRemove(req.params.user_id, function(err, user){
    if(err){
      return res.send(err);
    }
    res.json({message: 'Usuario eliminado'});
  });
})

//ROutes /pokemons
apiRouter.route('/pokemons')
.get(function(req, res){
  Pokemon.find(function(err, pokemons){
    if(err){
      return res.send(err);
    }

    res.json(pokemons);
  });
})
.post(function(req, res){
  var pokemon = new Pokemon();
  pokemon.name = req.body.name;
  pokemon.pokemonType = req.body.pokemonType;

  pokemon.save(function(err){
    if(err){
      if(err.code == 11000){ //mongo
        console.log(err);
        return res.json({success: false, message: 'El nombre es duplicado' })
      }
    }

    res.json({message: 'El pokemon se ha creado'});
  });
});

apiRouter.route('/pokemons/:pokemon_id')
.get(function(req, res){
  Pokemon.findById(req.params.pokemon_id, function(err, pokemon){
    if(err){
      return res.send(err);
    }

    res.json({message: pokemon.sayHi()});
  });
})
.put(function(req, res){
  Pokemon.findById(req.params.pokemon_id, function(err, pokemon){
    if(err){
      return res.send(err);
    }
    if(req.body.name){
      pokemon.name = req.body.name;
    }
    if(req.body.pokemonType){
      pokemon.pokemonType = req.body.pokemonType;
    }

    pokemon.save(function(err){
      if(err){
        return res.send(err);
      }

      res.json({message: 'Pokemon actualizado'});
    });
  });
})
.delete(function(req, res){
  Pokemon.findByIdAndRemove(req.params.pokemon_id, function(err, pokemon){
    if(err){
      return res.send(err);
    }
    res.json({message: 'Pokemon eliminado'});
  });
})

//Register our Routes
app.use('/api', apiRouter);

app.listen(port);

//console.log('Neo comes over port ' + port);
console.log('Neo comes over port ' + port);




//
// app.get('/', function(request, responsse){
//   response.sendFile(path.join(__dirname) + '/index.html');
// });
//
// //Middleware
// //mas generico, para toda la aplicacion
// adminRouter.use(function (req, res, next){
//   console.log('------->', req.method, req.url);
//   next();
// });
// //estos trabajan a nivel de parametro
// adminRouter.param('name', function (req, res, next, name){
//   console.log('req.name: ', req.name);
//   console.log('name: ', name);
//   req.name = 'Mr. robot wa here!';
//   next();
// });
//
// externalRouter.param('username', function(req, res, next, username){
//   if(username === 'mrrobot'){
//     req.username = 'jose';
//     next();
//   }else{
//     res.redirect('/external/error');
//   }
// });
//
// externalRouter.param('password', function(req, res, next, password){
//
//   if(password === '123456'){
//     next();
//   }else{
//     res.redirect('/external/error');
//   }
// });
//
// //Rutas
// //adminRouter
// adminRouter.get('/', function(req, res){
//   res.send('Estoy en la pagina principal del admin');
// });
//
// adminRouter.get('/users', function(req, res){
//   console.log('Ya llegue a la vista de usuarios');
//   res.send('Aqui se mostraran los usuarios');
// });
//
// adminRouter.get('/users/:name', function(req, res){
//   //res.send('Hola ' + req.params.name);
//   res.send('Hola ' + req.name);
// });
//
// adminRouter.get('/posts', function(req, res){
//   res.send('Aqui se mostraran los articulos');
// });
//
//
// //externalRouter
// externalRouter.get('/login/:username/:password', function(req, res){
//     res.send('Congratulations ' + req.username + ', you entered!!');
// });
//
// externalRouter.get('/error', function(req, res){
//   res.send('You are not allowed to enter this site. Get out!!')
// });
//
// app.use('/admin', adminRouter);
// app.use('/external', externalRouter);
//
// app.route('/account')
// .get(function(req, res){
//   var message = 'Method GET';
//   console.log(message);
//   res.send(message);
// })
// .post(function(req, res){
//   var message = 'Method POST';
//   console.log(message);
//   res.send(message);
// })
// .put(function(req, res){
//   var message = 'Method PUT';
//   console.log(message);
//   res.send(message);
// })
// .delete(function(req, res){
//   var message = 'Method DELETE';
//   console.log(message);
//   res.send(message);
// })
//
//
//
// //app.set('port', (process.env.PORT || 5000));
// app.listen(app.get('port'));

//console.log('Here we go!');
