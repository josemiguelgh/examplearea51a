angular.module('pokeApp.loginCtrl', ['lumx'])
.controller('loginCtrl', function($http, pokemonServices, authService, $scope){
  var vm = this;
  vm.message = "Este es el login";

  $scope.loginNow = function(){
    console.log("entering login method");
    var username = "fido";
    var password = "fido";
    var response = authService.login(username, password);
    console.log(response);
  }

});
