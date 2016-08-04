angular.module('pokeApp.controllers', ['lumx'])
.controller('loginCtrl', function(){
  var vm = this;
  vm.message = "Este es el login";

})
.controller('userCtrl', function(){
  var vm = this;
  vm.message = "Este es el admin de usuario";

})
.controller('pokemonCtrl', function(){
  var vm = this;
  vm.message = "Este es el admin de pokemon";
})
