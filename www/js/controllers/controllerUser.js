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

    // =========================A FINIR! =======================================
    // Delete Account
	/*$scope.DeleteCurrentAccount = function (DeleteData) {
	    io.socket.post('/DeleteUser', { token: $localStorage.Token }, function (data, jwres) {
	     
	        //console.log(jwres);
	        $scope.User = data;
	        console.log(data);
	        LocklistsServ.sendList(data);
	    })
	    io.socket.on('lock', function (msg) {
	        console.log(msg);
	        switch (msg.verb) {
	            case 'updated':
	                for (var i = $scope.locklists.length - 1; i >= 0; i--) {
	                    if ($scope.locklists[i].id == msg.data.lock.id) {
	                        $scope.locklists[i] = msg.data.lock;
	                    }
	                };
	                LocklistsServ.sendList($scope.locklists);
	                $scope.$apply();
	                break;

	            case 'created':
	                $scope.locklists.push(msg.data.lock);
	                LocklistsServ.sendList($scope.locklists);
	                $scope.$apply();
	                break;

	            case 'removedFrom':
	                if ($localStorage.User.id == msg.removedId) {
	                    $scope.locklists.splice($scope.locklists.indexOf(LocklistsServ.getlockbyID(msg.id)), 1);
	                    LocklistsServ.sendList($scope.locklists);
	                }
	                $scope.$apply();
	                break;

	            default: console.log('none');
	        }
	    })*/
    // ================================================================
     /*   //console.log(DeleteData.Password)
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

	};*/

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
    // Edit profil
	$scope.EditProfil = function (ProfilData) {
	    console.log(ProfilData)
	    req = {
	        method: 'POST',
	        url: server_url + '/EditProfil',
	        headers: {
	            'authorization': $localStorage.Token,
	        },
	        data: {
	            firstname: ProfilData.Firstname,
	            lastname: ProfilData.Lastname,
                email: ProfilData.Email,
	        }
	    }
	    var success = function (result) {
	        $scope.EditProfil = result.data;
	        console.log(result);

	        $ionicPopup.alert({
	            title: 'Edition Profil',
	            template: result.data,
	        });
	    }
	    var error = function (err) {
	    }
	    $http(req).then(success, error);
	};
    // ================================================================
    /*-- Edit profil modal*/
    // Create and load the Modal
	$ionicModal.fromTemplateUrl('templates/editProfil.html', function (modal) {
	    $scope.Modal_Editprofil = modal;
	}, {
	    scope: $scope,
	    animation: 'slide-in-up'
	})

    //controlleur to rename a lock
	$scope.editProfil = function (ProfilData) {
	    $scope.Modal_Editprofil.hide();
	    EditProfil(ProfilData);
	    // Called the model when the form is submitted
	};
    // Open our new task modal
	$scope.showEditProfil = function () {
	    $scope.Modal_Editprofil.show();
	}

    // Close the new task modal
	$scope.closeEditProfil = function () {
	    $scope.Modal_Editprofil.hide();
	}

    // ================================================================
}]);