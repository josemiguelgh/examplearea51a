angular.module('pokeApp.controllers', ['lumx'])
.controller('mainCtrl', function($location){
  var vm = this;
  vm.message = "Este es el login";
  vm.goTo = function(route){
    $location.path(route);
  }
})
.controller('loginCtrl', function($http, pokemonServices){
  var vm = this;
  vm.message = "Este es el login";
})
.controller('userCtrl', function(){
  var vm = this;
  vm.message = "Este es el admin de usuario";

})
.controller('pokemonCtrl', function($http, pokemonServices){
  var vm = this;
  vm.message = "Este es el admin de pokemon";
  pokemonServices.getPokemons().then(function(response){
      vm.pokemons = response;
  })
})
