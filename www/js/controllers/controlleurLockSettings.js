angular.module('controller.LockSettingsCtrl', [])

.controller('LockSettingsCtrl', ['$scope', '$stateParams', '$ionicModal','$localStorage', '$http','LocklistsServ', 'lockListSettingsServ', function ($scope, $stateParams, $ionicModal,$localStorage, $http, LocklistsServ, lockListSettingsServ) {

    var server_url = 'http://10.33.0.16:1337';
    $scope.lock = LocklistsServ.getlockbyID($stateParams.lockid);
    

    // ================================================================
    // Get the list of all user of a lock
    var getUserList = function (lock_id) {

        req = {
            method: 'POST',
            url: server_url + '/ListUsersForLock',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: {
                id: lock_id,
            }
        }
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        //var defer = $q.defer();

        // connection au serveur pour récupérer les listes des serrures d'un utilisateur
        var success = function (result) {
            $scope.userList = result.data;
            //return defer.resolve(result);
        }
        var error = function (err) {
            //return defer.reject(err);
        }
        $http(req).then(success, error);
        //return defer.promise;
    };
    // ================================================================
    getUserList($stateParams.lockid)
    // ================================================================

    //controlleur to add a user to a lock




    // ================================================================
    /*-- Rename lock modal*/

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('templates/renameLock.html', function (modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    })

    //controlleur to rename a lock
    $scope.rename = function (nameLock) {
        LocklistsServ.rename(nameLock, $stateParams.lockid);
        // Called the model when the form is submitted
        $scope.taskModal.hide();
    };
    // Open our new task modal
    $scope.newLockName = function () {
        $scope.taskModal.show();
    }

    // Close the new task modal
    $scope.closeNewLockName = function () {
        $scope.taskModal.hide();
    }

    // ================================================================
    /*-- Add User for Lock modal*/

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('templates/addUserForLock.html', function (modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    })

    //controlleur to add a user to a lock
    $scope.addUsertoLock = function (email) {
        LocklistsServ.addUsertoLock(email, $stateParams.lockid);
        // Called the model when the form is submitted
        $scope.taskModal.hide();
    };
    // Open our new task modal
    $scope.newUserToLock = function () {
        $scope.taskModal.show();
    }

    $scope.AddUser = function (email) {
        LocklistsServ.addUsertoLock(email, $stateParams.lockid);
        console.log("Send: " + email + "and ID: " + $stateParams.lockid);
    }
    // Close the new task modal
    $scope.closeAddUser = function () {
        $scope.taskModal.hide();
    }

    /* --OPTION--
    //controlleur pour ajouter un delai de fermeture du lock 
    $scope.setClock = function () {
    };*/
}]);