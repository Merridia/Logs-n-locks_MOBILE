angular.module('controller.LocklistsCtrl', [])

.controller('LocklistsCtrl', ['$scope', '$ionicModal' ,'LocklistsServ', function($scope, $ionicModal, LocklistsServ) {
	$scope.locklists = LocklistsServ.getLocklist();

	$scope.data = {
    	showReorder: false,
    };

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('templates/new_lock_list.html', function (modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Delete Lock from the list
    $scope.deleteLock = function (lock) {
    	$scope.locklists.splice($scope.locklists.indexOf(lock), 1);
  	};

    // Called when the form is submitted
    $scope.createLockList = function (lock) {
        $scope.locklists.push({
            title: lock.title
    });
        $scope.taskModal.hide();
        lock.title = "";
    };

    // Open our new task modal
    $scope.newLockList = function () {
        $scope.taskModal.show();
    };

    // Close the new task modal
    $scope.closeNewLockList = function () {
        $scope.taskModal.hide();
    };
}])

