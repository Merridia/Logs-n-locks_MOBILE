angular.module('Service.Authentificate', ['ngStorage'])

//User is Authentificate?
.service('AuthService', ['$localStorage', '$http', '$state', '$ionicPopup', '$q', function ($localStorage, $http, $state, $ionicPopup, $q) {

    //save User in local STorage
    var User = $localStorage.User;
    var Token = $localStorage.Token;
    //Send User to Serveur et Get User from serveur
    var server_url = 'http://10.33.1.46:1337'; // 'http://10.33.0.16:1337'; 

    this.isLoggedIn = function() {
        if (User == undefined) {
            return false
        }
        else {
            return true
        };
    }

    this.getUser = function()
    {
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
			if (result.statusText == "OK") {
				$localStorage.Token = result.data.token;
				$localStorage.User = result.data.user;
				User = result.data.user;
				$http.defaults.headers.common['authorization'] = result.data.token;
				$state.go('app.locklists');
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

    this.isLogOut = function () {
    	User = undefined;
    	Token = undefined;
        $localStorage.Token = undefined;
        $localStorage.User = undefined;
        $http.defaults.headers.common['authorization'] = undefined;
    };

}]);