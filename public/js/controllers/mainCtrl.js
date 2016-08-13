angular.module('pokeApp.mainCtrl', ['lumx'])
.controller('mainCtrl', function($location, authService, $rootScope){
  var vm = this;
  vm.loggedIn = authService.isLoggedIn();

  $rootScope.$on('$routeChangeStart', function(){
    vm.loggedIn = authService.isLoggedIn();

  })

  vm.message = "Este es el login";

  vm.goTo = function(route){
    $location.path(route);
  }
});
