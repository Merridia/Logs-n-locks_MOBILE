angular.module('controller.LocklistsCtrl', [])

.controller('LocklistsCtrl', ['$scope', '$ionicModal', '$ionicPopup', '$localStorage', 'LocklistsServ', function($scope, $ionicModal, $ionicPopup, $localStorage, LocklistsServ) {



    io.socket.post('/ListLocksForUser', { token: $localStorage.Token }, function(data, jwres) {
        console.log(data);
        console.log(jwres);

        $scope.locklists = data;
        LocklistsServ.sendList(data);
    })
    io.socket.on('lock', function(msg) {
        console.log("message :"+msg);
    })

    // connection au serveur pour récupérer les listes des serrures d'un utilisateur
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
  	}

    // Called when the form is submitted
    $scope.createLockList = function (lock) {
        LocklistsServ.addnewlock(lock.title);
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

