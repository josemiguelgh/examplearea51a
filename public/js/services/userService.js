angular.module('pokeApp.userServices',[])
.service('User', function ($http, $q){

  var _user = undefined;
  var _users = undefined;

  this.all = function(){
      if(!_users){
        var deferred = $q.defer();

        $http.get("/api/users")
          .success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });

        _users = deferred.promise;
      }
      return _users;
  }

  this.get = function(id){
    var deferred = $q.defer();
    $http.get("/api/users/" + id)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(response){
        deferred.reject(response);
      });
    return deferred.promise;
  }

  this.create = function(user){
    var deferred = $q.defer();

    $http.post("/api/users/", user)
    .success(function(response){
      deferred.resolve(response);
    })
    .error(function(response){
      deferred.reject(response);
    });

    return deferred.promise;
  }

  this.update = function(user){
    var deferred = $q.defer();

    $http.put("/api/users", user)
    .success(function(response){
      console.log("new user update succes");
      deferred.resolve(response);
    })
    .error(function(response){
      console.log("new user update error");
      deferred.reject(response);
    });

    return deferred.promise;
  }
})
