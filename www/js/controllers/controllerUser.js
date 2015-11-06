angular.module('controllers.User', [])

.controller('UserCtrl', ['$scope', '$ionicModal', '$state', '$localStorage', 'AuthService', function ($scope, $ionicModal, $state, $localStorage, AuthService) {

    var User = $localStorage.User;
    console.log(User)
	$scope.err = $localStorage.err;

	$scope.login = function(loginData) {
		AuthService.sendUser(loginData.email, loginData.password);
	}

    //Afficher les informations de l'utilisateur
	$scope.User = User
    console.log(User)
	$scope.UserFName = User.Firstname;
	console.log($scope.UserFName);
	$scope.UserLName = User.Lastname;
	console.log($scope.UserLName);

	$scope.account = function () {
	    console.log($scope.User)
	    $state.go('app.account', {
	        lockid: $scope.User,
	    })
	};
}]);