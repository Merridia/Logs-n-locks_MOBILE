angular.module('Service.Authentificate', ['ngStorage'])

//Send User to Serveur et Get User from serveur

//save User in local STorage

//User is Authentificate?
.service('AuthService', ['$localStorage', '$http', '$state', function($localStorage, $http, $state){

    var User = $localStorage.User;
    var Token = $localStorage.Token;
    var isLog = $localStorage.isLog || false;
    var server_url = 'http://localhost:1337';

    this.isLoggedIn = function() {
        return isLog;
    }

    this.sendUser = function(mail, pwd) {
    	req = {
			method: 'POST',
			url: server_url + '/api/login',
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
			if (result.statusText == "OK") {
				$localStorage.Token = result.data.token;
				$localStorage.User = result.data.user;
				$localStorage.isLog = true;
				$state.go('app.locklists');
			}
		}

		var error = function(err){
			
		}

    	$http(req).then(success,error);
    }

}]);