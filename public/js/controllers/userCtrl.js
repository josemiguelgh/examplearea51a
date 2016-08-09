angular.module('pokeApp.userCtrl', ['lumx'])
.controller('userCtrl', function(User){
  var vm = this;
  vm.message = "Este es el admin de usuario";

  User.all().then(function(response){
    vm.users = response;
        
  })
})
