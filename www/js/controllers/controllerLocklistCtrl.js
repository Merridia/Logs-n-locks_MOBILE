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

    var toggleStatus = function() {
        if ($scope.lock.isOpen) {
            $scope.status = "The door is unlock";
        }
        else {
            $scope.status = "The door is lock";
        }
    }

    toggleStatus();
    getUserList();

    $scope.isOpenOrNot = function() {
        return $scope.lock.isOpen;
    }

    $scope.open = function () {
    	$scope.lock.isOpen = !$scope.lock.isOpen;
        LocklistsServ.toggleLock($stateParams.locklistId, $scope.lock.isOpen);
        toggleStatus();
    };

    $scope.setting = function () {
        console.log($scope.lock.id)
        $state.go('app.LockSettings', {
            lockid : $scope.lock.id,
        });
    };
}]);