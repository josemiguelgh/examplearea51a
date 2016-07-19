//packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//user Schema
var PokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  pokemonType:{
    type: String,
    required: true
  },
  timesInvoked:{
    type: Number,
    required: true,
    default: 0
  }
});

PokemonSchema.post('findOne', function(pokemon){
  console.log('hi');
  // var pokemon = this;
  // pokemon.timesInvoked = pokemon.timesInvoked + 1;
  // pokemon.save(function(err){
  //   if(err){
  //     console.log(err);
  //     return res.send(err);
  //   }
  //   console.log('Pokemon actualizado a ' + pokemon.timesInvoked);
  //   return next();
  // });
});


PokemonSchema.methods.sayHi = function(){
  var pokemon = this;
  return 'Hola, soy un ' + pokemon.name + ' de tipo ' + pokemon.pokemonType;
};

module.exports = mongoose.model('Pokemon', PokemonSchema);