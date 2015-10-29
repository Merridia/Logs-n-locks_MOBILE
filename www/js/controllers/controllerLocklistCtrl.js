angular.module('controller.LocklistCtrl', [])

.controller('LocklistCtrl',['$scope', '$stateParams', 'LocklistsServ', function ($scope, $stateParams,LocklistsServ) {
    $scope.lock = LocklistsServ.getLock($stateParams.locklistId);
    
    $scope.open = function () {
        LocklistsServ.toggleLock($stateParams.locklistId);
    };
}]);