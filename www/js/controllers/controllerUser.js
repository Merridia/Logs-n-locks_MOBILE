angular.module('controllers.User', [])

.controller('UserCtrl', ['$scope', '$ionicModal', '$state', '$http',
    '$ionicPopup', '$localStorage', 'AuthService',
    function ($scope, $ionicModal, $state, $http, $ionicPopup, $localStorage, AuthService) {
        
        var server_url = 'http://10.33.1.46:1337';

        var User = $localStorage.User;
        var ModifMdp = false;
        var AccDelete = false;
        $scope.err = $localStorage.err;

        $scope.login = function (loginData) {
            AuthService.sendUser(loginData.email, loginData.password);
        }

        //Afficher les informations de l'utilisateur
        $scope.User = User
        $scope.ModifMdp = ModifMdp
        //$scope.AccDelete = AccDelete
        $scope.account = function () {
            console.log($scope.User);
            $state.go('app.account', {
                lockid: $scope.User,
            })
        };

        // =========================A FINIR! =======================================
        // Delete Account
        $scope.DeleteCurrentAccount = function (DeleteData) {
            io.socket.post('/DeleteUser', { token: $localStorage.Token, password: $scope.DeleteData.Password }, function (data, jwres) {
                $scope.User = data;
                console.log(data);
            });
            io.socket.on('lock', function (msg) {
                // An alert dialog
                $scope.showAlert = function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Delete Account',
                        template: 'Test'
                    });
                    showAlert();
                    alertPopup.then(function (res) {
                        $state.go('app.login'),
                        console.log(msg.data);
                        AuthService.isLogOut();
                    });
                };
            });
        };

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
         $scope.EditProfil = function (User) {
             console.log(User)
             req = {
                 method: 'POST',
                 url: server_url + '/EditProfil',
                 headers: {
                     'authorization': $localStorage.Token,
                 },
                 data: {
                     firstname: User.firstname,
                     lastname: User.lastname,
                     email: User.email,
                 }
             }
             var success = function (result) {
                 $scope.EditProfil = result.data;
                 console.log(result);
                 $ionicPopup.alert({
                     title: 'Edition Profil',
                     template: 'Edition ' + result.data,
                 });
             }
             var error = function (err) {
             }
             $http(req).then(success, error);
         };

    // ================================================================
    /*-- Edit profil modal*/
    // Create and load the Modal
         $ionicModal.fromTemplateUrl('templates/editProfil.html', {
             scope: $scope,
             animation: 'slide-in-up'
         }).then(function (modal) {
             $scope.Modal_Editprofil = modal;
         });

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