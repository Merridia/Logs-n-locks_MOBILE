﻿angular.module('controllers.User', [])

.controller('UserCtrl', ['$scope', '$ionicModal', '$state', '$localStorage', 'AuthService', function ($scope, $ionicModal, $state, $localStorage, AuthService) {

	$scope.err = $localStorage.err;

	$scope.login = function(loginData) {
		AuthService.sendUser(loginData.email, loginData.password);
	}
}]);