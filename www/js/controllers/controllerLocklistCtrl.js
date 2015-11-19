angular.module('controller.LocklistCtrl', [])

.controller('LocklistCtrl',['$scope', '$stateParams', 'LocklistsServ', '$state','AuthService', function ($scope, $stateParams,LocklistsServ, $state, AuthService) {

    $scope.lock = LocklistsServ.getlockbyID($stateParams.locklistId);

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
        }
    })
  
    var toggleStatus = function() {
        if ($scope.lock.isOpen) {
            $scope.status = "The door is unlock";
        }
        else {
            $scope.status = "The door is lock";
        }
    }
    toggleStatus();

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

    $scope.isOpenOrNot = function() {
        return $scope.lock.isOpen;
    }

    $scope.open = function () {
        $scope.lock.isOpen = !$scope.lock.isOpen;
        LocklistsServ.toggleLock($stateParams.locklistId, $scope.lock.isOpen);
    };

    $scope.setting = function () {
        $state.go('app.LockSettings', {
            lockid : $scope.lock.id,
        });
    };
}]);