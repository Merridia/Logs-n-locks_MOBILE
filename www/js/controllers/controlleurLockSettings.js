angular.module('controller.LockSettingsCtrl', [])

.controller('LockSettingsCtrl', ['$state', '$scope', '$stateParams', '$ionicModal','$localStorage', '$http','LocklistsServ', 'lockListSettingsServ', function ($state, $scope, $stateParams, $ionicModal,$localStorage, $http, LocklistsServ, lockListSettingsServ) {

    var server_url = 'http://10.33.1.46:1337';
    $scope.lock = LocklistsServ.getlockbyID($stateParams.lockid);
    //console.log($scope.lock)
    $scope.Admin = false;
    $scope.CurrentUser = $localStorage.User
    //console.log($localStorage.User)

    var IsAdmin = function () {
        if ($scope.lock.idAdmin == $scope.CurrentUser.id) {
            $scope.Admin = true;
        }
        else
            $scope.Admin = false;
    };
    IsAdmin();
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
    io.socket.on('lock',function(msg){
        console.log(msg);
        switch(msg.verb) {
            case 'updated':
                if(msg.id == $scope.lock.id) {
                    $scope.lock = msg.data.lock;
                    $scope.$apply();
                }
                break;

            case 'removedFrom':
                if ($scope.lock.id == msg.id) {
                    if ($localStorage.User.id == msg.removedId) {
                        $state.go('app.locklists');
                    }
                    else {
                        getUserList($stateParams.lockid);
                    }
                }
                $scope.$apply();
                break;

            case 'addedTo':
                if ($scope.lock.id == msg.id) {
                    getUserList($stateParams.lockid);
                }
                $scope.$apply();
                break;

            case 'destroyed':
                if ($scope.lock.id == msg.id) {
                    $state.go('app.locklists');
                }
                break;
        }
    })

    // ================================================================
    getUserList($stateParams.lockid);
    // ================================================================
    /*-- Rename lock modal*/
    // Create and load the Modal
    $ionicModal.fromTemplateUrl('templates/renameLock.html', function (modal) {
        $scope.taskModal_rename = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    })

    //controlleur to rename a lock
    $scope.rename = function (nameLock) {
        $scope.taskModal_rename.hide();
        console.log(nameLock);
        if( nameLock != undefined) {
            LocklistsServ.rename(nameLock, $stateParams.lockid);
        }
        // Called the model when the form is submitted
    };
    // Open our new task modal
    $scope.newLockName = function () {
        $scope.taskModal_rename.show();
    }

    // Close the new task modal
    $scope.closeNewLockName = function () {
        $scope.taskModal_rename.hide();
    }

    // ================================================================
    /*-- Add User for Lock modal*/
    //controlleur to add a user to a lock
    // Create and load the Modal
    $ionicModal.fromTemplateUrl('templates/addUserForLock.html', function (modal) {
        $scope.taskModal_addUser = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    })

    //controlleur to add a user to a lock
    $scope.addUsertoLock = function (email) {
        LocklistsServ.addUsertoLock(email, $stateParams.lockid).then(success, err);

        var success = function () {
            $scope.userList.push(email);

        }
        // Called the model when the form is submitted
        $scope.taskModal_addUser.hide();
    };

    $scope.removeUsertoLock = function(idUser) {
        LocklistsServ.removeUserOnLock(idUser, $stateParams.lockid);
        console.log("remove user : "+ idUser);
    }

    // Open our new task modal
    $scope.newUserToLock = function () {
        $scope.taskModal_addUser.show();
    }

    $scope.AddUser = function (email) {
        LocklistsServ.addUsertoLock(email, $stateParams.lockid);
        console.log("Send: " + email + "and ID: " + $stateParams.lockid);
    }
    // Close the new task modal
    $scope.closeAddUser = function () {
        $scope.taskModal_addUser.hide();
    }

    /* --OPTION--
    //controlleur pour ajouter un delai de fermeture du lock 
    $scope.setClock = function () {
    };*/
}]);