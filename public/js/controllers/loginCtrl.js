angular.module('pokeApp.loginCtrl', ['lumx'])
.controller('loginCtrl', function($http, pokemonServices){
  var vm = this;
  vm.message = "Este es el login";
});
