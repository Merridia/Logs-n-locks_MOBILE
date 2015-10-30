angular.module('controllers.User', [])

.controller('UserCtrl', ['$scope', '$ionicModal', '$state', '$localStorage', 'AuthService', function ($scope, $ionicModal, $state, $localStorage, AuthService) {

	$localStorage.err = "test";

	$scope.login = function(loginData) {

		AuthService.sendUser(loginData.email, loginData.password)
	}
}]);