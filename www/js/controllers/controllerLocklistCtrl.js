angular.module('controller.LocklistCtrl', [])

.controller('LocklistCtrl',['$scope', '$stateParams', 'LocklistsServ', '$state','AuthService', function ($scope, $stateParams,LocklistsServ, $state, AuthService) {
    $scope.lock = LocklistsServ.getLock($stateParams.locklistId);
    
    var getUserList = function() {
        var success = function(result){
        	for (var i = result.length - 1; i >= 0; i--) {
        		if(result[i].id == AuthService.getUser().id)
        		{
        			result.splice(result[i], 1);
        		}
        	};
            $scope.userList = result;
        }

        var error = function (err) {
            $ionicPopup.alert({
                title: err.statusText,
                template: err.data.err
            });
        }
    
        LocklistsServ.getUserList($stateParams.locklistId).then(success,error);
    }

    getUserList();

    $scope.open = function () {
    	$scope.lock.isOpen = !$scope.lock.isOpen;
        LocklistsServ.toggleLock($stateParams.locklistId, $scope.lock.isOpen);
    };

    $scope.setting = function () {
        console.log($scope.lock.id)
        $state.go('app.LockSettings', {
            lockid : $scope.lock.id,
        });
    };

}]);