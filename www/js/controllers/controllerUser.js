angular.module('controllers.User', [])

.controller('UserCtrl', ['$scope', '$ionicModal', '$state', '$http', '$ionicPopup' ,'$localStorage', 'AuthService', function ($scope, $ionicModal, $state,$http,$ionicPopup, $localStorage, AuthService) {

    var server_url = 'http://10.33.1.46:1337';

    var User = $localStorage.User;
    var ModifMdp = false;
    var AccDelete = false;
    $scope.err = $localStorage.err;

	$scope.login = function(loginData) {
		AuthService.sendUser(loginData.email, loginData.password);
	}

    //Afficher les informations de l'utilisateur
	$scope.User = User
	$scope.ModifMdp = ModifMdp
    //$scope.AccDelete = AccDelete
	$scope.account = function () {
	    console.log($scope.User)
	    $state.go('app.account', {
	        lockid: $scope.User,
	    })
	};

    // ================================================================
    // Delete Account
	$scope.DeleteCurrentAccount = function (DeleteData) {
        //console.log(DeleteData.Password)
	    req = {
	        method: 'POST',
	        url: server_url + '/DeleteUser',
	        headers: {
	            'authorization': $localStorage.Token,
	        },
	        data: {
	            password: DeleteData.Password,
	        }
	    }
	    // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
	    //var defer = $q.defer();
	    //console.log(AccountData);
	    // connection au serveur pour récupérer les listes des serrures d'un utilisateur
	    var success = function (result) {
	        $scope.DeleteCurrentAccount = result.data;
	        //return defer.resolve(result);
	        console.log(result);
	        $ionicPopup.alert({
	            title: 'Delete Status',
	            template: result.data,
	            onTap: $scope.AccDelete = false
	        });
	    }
	    var error = function (err) {
	        //return defer.reject(err);
	    }
	    $http(req).then(success, error);
	    // return defer.promise;
	};
    // ================================================================

    // ================================================================
    // Change Password
	$scope.ChangeCurrentPassword = function (Newpassword) {
	    console.log(Newpassword)
	    req = {
	        method: 'POST',
	        url: server_url + '/ChangePass',
	        headers: {
	            'authorization': $localStorage.Token,
	        },
	        data: {
	            password: Newpassword,
	        }
	    }
	    var success = function (result) {
	        $scope.DeleteCurrentAccount = result.data;
	        console.log(result);

	        $ionicPopup.alert({
	            title: 'Password Change',
	            template: result.data,
	            onTap: $scope.ModifMdp = false
	        });
	    }
	    var error = function (err) {
	    }
	    $http(req).then(success, error);
	};
    // ================================================================
}]);