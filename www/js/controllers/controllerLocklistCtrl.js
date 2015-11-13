angular.module('controller.LocklistCtrl', [])

.controller('LocklistCtrl',['$scope', '$stateParams', 'LocklistsServ', '$state','AuthService', function ($scope, $stateParams,LocklistsServ, $state, AuthService) {

    $scope.lock = LocklistsServ.getlockbyID($stateParams.locklistId);

    var toggleStatus = function () {
        if ($scope.lock.isOpen) {
            $scope.status = "The door is unlock";
        }
        else {
            $scope.status = "The door is lock";
        }
    }
    toggleStatus();

    $scope.isOpenOrNot = function() {
        return $scope.lock.isOpen;
    }

    $scope.open = function () {
    	$scope.lock.isOpen = !$scope.lock.isOpen;
        LocklistsServ.toggleLock($stateParams.locklistId, $scope.lock.isOpen);
        toggleStatus();
    };

    $scope.setting = function () {
        $state.go('app.LockSettings', {
            lockid : $scope.lock.id,
        });
    };
}]);