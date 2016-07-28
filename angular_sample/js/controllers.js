angular.module('myApp.controllers', [])
.controller('mainCtrl', function($scope, $filter, cityService){
  $scope.message = "la aplicacion ha sido creada";
  $scope.name = "Jose Gutierrez";
  $scope.toLowerCase = $filter('lowercase')($scope.name);
  $scope.isCapitalized = function(str){
    return str[0] == str[0].toUpperCase();
  }


  console.log($scope.message);
  console.log(cityService.getCity('SFO'));
})
.controller('countryCtrl', function($scope, $filter){
  $scope.countries = [
    {name:'Peru', abr:'per'},
    {name:'Argentina', abr:'arg'},
    {name:'Uruguay', abr:'uru'},
    {name:'Brasil', abr:'bra'},
    {name:'Chile', abr:'chi'}
  ];

  $scope.logTest = function(abreviation){
    var country = $filter('filter')($scope.countries, {
      abr: abreviation
    }, true);
    console.log(country[0].name);
  }
})
.controller('clockCtrl', function($scope){
  $scope.clock = {
    now: new Date()
  }

  var updateClock = function(){
    $scope.clock.now = new Date();
  }

  $scope.changeClock = function(){
    updateClock();
  }

  setInterval(function(){
    $scope.$apply(updateClock);
  }, 1000)
});
