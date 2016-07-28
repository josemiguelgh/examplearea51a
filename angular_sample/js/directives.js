angular.module('myApp.directives', [])
.directive('atributo', function(){
  return {
    restrict: 'A',
    template: '<h1>Hola directiva</h1>'
    //templateUrl: miarchivo.html
  }
})
.directive('elemento', function(){
  return {
    restrict: 'E',
    template: '<h1>Directiva element</h1>'
  }
})
.directive('reloj', function(){
  return {
    restrict: 'E',
    templateUrl: 'reloj.html'/*,
  templateUrl*/
  }
});
