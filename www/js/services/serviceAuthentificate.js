angular.module('Service.Authentificate', ['ngStorage'])

//Send User to Serveur et Get User from serveur

//save User in local STorage

//User is Authentificate?
.service('AuthService', ['$localStorage', '$http', '$state', '$ionicPopup', function($localStorage, $http, $state, $ionicPopup){

    var User = $localStorage.User;
    var Token = $localStorage.Token;

    var server_url = 'http://localhost:1337';

    this.isLoggedIn = function() {
        return User;
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
				$state.go('app.locklists');
				$http.defaults.headers.common['Authorization'] = "Bearer " + result.data.token;
			}
		}

		var error = function(err){
			$ionicPopup.alert({
				title: err.statusText,
				template: err.data.err
			});
		}

    	$http(req).then(success,error);
    }

}]);