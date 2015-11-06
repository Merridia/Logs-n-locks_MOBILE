angular.module('controller.LocklistCtrl', [])

.controller('LocklistCtrl',['$scope', '$stateParams', 'LocklistsServ', 'AuthService', function ($scope, $stateParams, LocklistsServ, AuthService) {

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

    var toggleStatus = function() {
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
        toggleStatus();
        LocklistsServ.toggleLock($stateParams.locklistId, $scope.lock.isOpen);
    };
}]);