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
  },
  owner:{
    type: Schema.ObjectId,
    ref: 'User'
  }
});

PokemonSchema.post('findOne', function(pokemon){
  console.log('hi');

  pokemon.timesInvoked = pokemon.timesInvoked + 1;
  pokemon.save(function(err){
    if(err){
      console.log(err);
      return res.send(err);
    }
    console.log('Pokemon actualizado a ' + pokemon.timesInvoked);
  });
});


PokemonSchema.methods.sayHi = function(){
  var pokemon = this;
  return 'Hola, soy un ' + pokemon.name + ' de tipo ' + pokemon.pokemonType;
};

module.exports = mongoose.model('Pokemon', PokemonSchema);
