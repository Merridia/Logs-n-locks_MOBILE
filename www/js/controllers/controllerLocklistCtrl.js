angular.module('controller.LocklistCtrl', [])

.controller('LocklistCtrl',['$scope', '$stateParams', 'LocklistsServ', function ($scope, $stateParams,LocklistsServ) {
    $scope.lock = LocklistsServ.getLock($stateParams.locklistId); 
    $scope.shouldShowDelete = true;
    $scope.listCanSwipe = true;
    
    $scope.open = function () {
        LocklistsServ.toggleLock($stateParams.locklistId);
        console.log('Check StateParam IsOpen', LocklistsServ.getIsLock);
    };
}]);