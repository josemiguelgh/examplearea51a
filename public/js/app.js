angular.module('pokeApp', [
  'pokeApp.routes',
  'pokeApp.loginCtrl',
  'pokeApp.mainCtrl',
  'pokeApp.pokemonCtrl',
  'pokeApp.userCtrl',
  'pokeApp.pokemonServices',
  'pokeApp.userServices',
  'pokeApp.authService',
  'lumx'
])
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});
