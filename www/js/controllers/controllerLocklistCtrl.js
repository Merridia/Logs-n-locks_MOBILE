angular.module('controller.LocklistCtrl', [])

.controller('LocklistCtrl',['$scope', '$stateParams', 'LocklistsServ', '$state', function ($scope, $stateParams,LocklistsServ, $state) {
    $scope.lock = LocklistsServ.getLock($stateParams.locklistId);
    
    $scope.open = function (isOpen) {
        LocklistsServ.toggleLock($stateParams.locklistId, !isOpen);
    };

    $scope.setting = function () {
        console.log($scope.lock.id)
        $state.go('app.LockSettings', {
            lockid : $scope.lock.id,
        });
    };

}]);