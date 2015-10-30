angular.module('Service.Authentificate', ['ngStorage'])

//Send User to Serveur et Get User from serveur

//save User in local STorage

//User is Authentificate?
.service('AuthService', ['$localStorage', '$http', function($localStorage, $http){
    var User = $localStorage.User;
    var isLog = $localStorage.isLog || false;

    this.isLoggedIn = function() {
        return isLog;
    }

    this.sendUser = function(mail, pwd) {
    	req = {
			method: 'POST',
			url: 'http://localhost:1337/api/login',
			headers: {
				'authorization': undefined,
			},
			data: { 
					email: mail, 
					password: pwd 
				}
		}
		
		var success = function(result){
			console.log(result);
		}
		
		var error = function(err){
			console.log(err);
		}

    	$http(req).then(success,error);
    }

}]);