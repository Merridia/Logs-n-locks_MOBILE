angular.module('Service.Authentificate', ['ngStorage'])

//Send User to Serveur et Get User from serveur

//save User in local STorage

//User is Authentificate?
.service('AuthService', ['$localStorage', function($localStorage){
    var User = $localStorage.User;
    var isLog = false;

    this.isLoggedIn = function(){
        return isLog
    }

}]);