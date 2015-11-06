angular.module('controller.LocklistsCtrl', [])

.controller('LocklistsCtrl', ['$scope', '$ionicModal', '$ionicPopup','LocklistsServ', function($scope, $ionicModal, $ionicPopup, LocklistsServ) {

    // connection au serveur pour récupérer les listes des serrures d'un utilisateur
    var getlocklist = function() {
        LocklistsServ.getLocklist();
    }

    getlocklist();

	$scope.data = {
    	showReorder: false,
    }

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('templates/new_lock_list.html', function (modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    })

    // Delete Lock from the list
    $scope.deleteLock = function (lock) {
        //$scope.locklists.splice($scope.locklists.indexOf(lock), 1);
        LocklistsServ.deletelock(lock);
        LocklistsServ.getLocklist().then(success, error);
  	}

    // Called when the form is submitted
    $scope.createLockList = function (lock) {
        LocklistsServ.addnewlock(lock.title);
        LocklistsServ.getLocklist().then(success, error);
        $scope.taskModal.hide();
        lock.title = "";
    }

    // Open our new task modal
    $scope.newLockList = function () {
        $scope.taskModal.show();
    }

    // Close the new task modal
    $scope.closeNewLockList = function () {
        $scope.taskModal.hide();
    }
}])

