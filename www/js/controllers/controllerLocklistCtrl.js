angular.module('controller.LocklistCtrl', [])

.controller('LocklistCtrl', ['$localStorage', '$state', '$scope', '$stateParams', '$ionicPopup', 'LocklistsServ', '$state', 'AuthService', function ($localStorage, $state, $scope, $stateParams, $ionicPopup, LocklistsServ, $state, AuthService) {

    $scope.lock = LocklistsServ.getlockbyID($stateParams.locklistId);
    // ================================================================
    // get User
    var getUserList = function() {
        var success = function (result) {
        	$scope.userList = result;
        	console.log(result);
        }

        var error = function (err) {
            $ionicPopup.alert({
                title: err.statusText,
                template: err.data.err
            });
        }
    
        LocklistsServ.getUserList($stateParams.locklistId).then(success, error);
    }

    io.socket.on('lock',function(msg){
        console.log(msg);
        switch(msg.verb) {
            case 'updated':
                if(msg.id == $scope.lock.id) {
                    $scope.lock = msg.data.lock;
                    toggleStatus();
                    getLogs();
                    $scope.$apply();
                }
                break;

            case 'addedTo':
                if(msg.id == $scope.lock.id) {
                    getLogs();
                    $scope.$apply();
                }
                break;

            case 'removedFrom':
                if(msg.id == $scope.lock.id) {
                    if ($localStorage.User.id == msg.removedId) {
                        $state.go('app.locklists');
                    }
                    else {
                        getLogs();
                        $scope.$apply();
                    }
                }
                break;

            case 'destroyed':
                if(msg.id == $scope.lock.id) {
                    $state.go('app.locklists');
                }
                break;
        }
    })
  
    // ================================================================
    // Put the status of the toggle in the list settings
    var toggleStatus = function() {
        if ($scope.lock.isOpen) {
            $scope.status = "The door is unlock";
        }
        else {
            $scope.status = "The door is lock";
        }
    }
    toggleStatus();

    // ================================================================
    // Get log for the choosen lock

    var getLogs = function() {
        var success = function (result) {
            var loglist = result.data;
            for (var i = 0; i <= result.data.length; i++) {
                if(result.data[i] == null) {
                    loglist.splice(i, 10-i);
                }
            };
            $scope.logs = loglist;
        }

        var error = function (err) {
            $ionicPopup.alert({
                title: err.statusText,
                template: err.data.err
            });
        }
    
        LocklistsServ.getLogsForLock($stateParams.locklistId).then(success, error);
    }
    getLogs();

    // ================================================================
    // Check if the door is open or not
    $scope.isOpenOrNot = function() {
        return $scope.lock.isOpen;
    }

    // ================================================================
    // Change the lock status the lock
    $scope.open = function () {
        $scope.lock.isOpen = !$scope.lock.isOpen;
        LocklistsServ.toggleLock($stateParams.locklistId, $scope.lock.isOpen);
    };

    // ================================================================
    // Show settings
    $scope.setting = function () {
        $state.go('app.LockSettings', {
            lockid : $scope.lock.id,
        });
    };
}]);