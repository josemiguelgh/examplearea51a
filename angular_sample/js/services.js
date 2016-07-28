angular.module('myApp.services',[])
.service('cityService', function(){
  this.getCity = function(abr){
    //buscar la ciudad desde una coleccion
    return "San Francisco";
  }
})
