angular.module('controller.LocklistsCtrl', [])

.controller('LocklistsCtrl', ['$scope', '$ionicModal' ,'LocklistsServ', function($scope, $ionicModal, LocklistsServ) {

    // connection au serveur pour récupérer les listes des serrures d'un utilisateur
    var success = function(result){
        console.log(result);
        $scope.locklists = result;
    }
    var error = function(err){
        $ionicPopup.alert({
            title: err.statusText,
            template: err.data.err
        });
    }

    LocklistsServ.getLocklist().then(success,error);

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
        //$scope.locklists.splice($scope.locklists.indexOf(lock), 1);
        LocklistsServ.deletelock(lock);
        LocklistsServ.getLocklist().then(success, error);
  	};

    // Called when the form is submitted
    $scope.createLockList = function (lock) {
        LocklistsServ.addnewlock(lock.title);
        LocklistsServ.getLocklist().then(success, error);
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

