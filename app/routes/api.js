var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var User = require('../db/user');
var Pokemon = require('../db/pokemon');
var config = require('../../config');

var superSecret = config.superSecret;

module.exports = function(app, express){

  //Express router instance
  var apiRouter = express.Router();

  // //Accesed at GET http://localhost:5000/api
  // apiRouter.get('/', function(req, res){
  //   // res.json({ message: 'Stop to try hit me and hit me!' });
  //   res.json({ message: 'Welcome to Zion! (Our mother API)' });
  // });

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
          var token = jwt.sign(
          {
            name: user.name,
            username: user.username,
          }, superSecret,
          {
            expiresIn: '2h'
          });

          res.json({
            success: true,
            message: 'Swordfish: Acceso Autorizado',
            token: token
          });
        }
      }
    });
  });


  // //Middleware to verify a token
  // apiRouter.use(function(req, res, next){
  //   console.log('Alguien ha entrado a la Matrix');
  //   var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //
  //   if(token){
  //     //verify token
  //     jwt.verify(token, superSecret, function(err, decoded){
  //       if(err){
  //         return res.json({
  //           success: false,
  //           message: 'Fallo la autenticacion del token'
  //         });
  //       }else{
  //         console.log(decoded);
  //         req.decoded = decoded;
  //         next();
  //       }
  //     });
  //   }else{
  //     return res.status(403).send({
  //       success: false,
  //       message: 'No se envio el token'
  //     });
  //   }
  // });

  apiRouter.get('/', function(req, res){
    res.json({
      message: 'Welcome to the Matrix!'
    });
  });

  apiRouter.route('/me')
  .get(function(req, res){
    res.json({
      username: req.decoded.username
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

  return apiRouter;
}
