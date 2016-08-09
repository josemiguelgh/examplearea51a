angular.module('pokeApp.mainCtrl', ['lumx'])
.controller('mainCtrl', function($location){
  var vm = this;
  vm.message = "Este es el login";
  vm.goTo = function(route){
    $location.path(route);
  }
});
