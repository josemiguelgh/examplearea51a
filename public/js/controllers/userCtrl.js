angular.module('pokeApp.userCtrl', ['lumx'])
.controller('userCtrl', function(User, $scope){
  var vm = this;
  vm.message = "Este es el admin de usuario";

  User.all().then(function(response){
    vm.users = response;
    console.log(response);
  })

  $scope.getUser = function(userId){

    User.get(userId).then(function(response){
      vm.currentUser = response;
    })
  }

  $scope.createUser = function(user){
     User.create(user).then(function(response){
       User.all().then(function(response){
         vm.users = response;
       })
     })
  }

  $scope.updateUser = function(user){
     User.update(user).then(function(response){
       console.log("user has been updated");
     })
  }
})
