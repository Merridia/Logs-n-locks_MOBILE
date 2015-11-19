angular.module('controller.LocklistsCtrl', [])

.controller('LocklistsCtrl', ['$scope', '$ionicModal', '$ionicPopup', '$localStorage', 'LocklistsServ', function($scope, $ionicModal, $ionicPopup, $localStorage, LocklistsServ) {

    io.socket.post('/ListLocksForUser', { token: $localStorage.Token }, function(data, jwres) {
        //console.log(data);
        //console.log(jwres);
        $scope.locklists = data;
        LocklistsServ.sendList(data);
    })
    io.socket.on('lock',function(msg){
        console.log(msg);
        switch(msg.verb) {
            case 'updated':
                for (var i = $scope.locklists.length - 1; i >= 0; i--) {
                    if ($scope.locklists[i].id == msg.data.lock.id) {
                        $scope.locklists[i] = msg.data.lock;
                    }
                };
                LocklistsServ.sendList($scope.locklists);
                $scope.$apply();
                break;

            case 'created':
                $scope.locklists.push(msg.data.lock);
                LocklistsServ.sendList($scope.locklists);
                $scope.$apply();
                break;

            case 'removedFrom':
                if ($localStorage.User.id == msg.removedId) {
                    $scope.locklists.splice($scope.locklists.indexOf(LocklistsServ.getlockbyID(msg.id)), 1);
                    LocklistsServ.sendList($scope.locklists);
                }
                $scope.$apply();
                break;

            default: console.log('none');
        }
    })

    // connection au serveur pour récupérer les listes des serrures d'un utilisateur
	$scope.data = {
    	showReorder: false,
    }

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('templates/new_lock_list.html', function (modal) {
        $scope.ModalLockList = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    })

    // Delete Lock from the list
    $scope.deleteLock = function (lock) {
        //$scope.locklists.splice($scope.locklists.indexOf(lock), 1);
        io.socket.post('/DeleteLockForUser', { token: $localStorage.Token, idLock: lock });
  	}

    // Called when the form is submitted
    $scope.createLockList = function (lock) {
        io.socket.post('/AddLockForUser', { token: $localStorage.Token, nameLock: lock.title }, function(data, jwres) {
            $scope.locklists.push(data);
            LocklistsServ.sendList($scope.locklists);
        })
        $scope.ModalLockList.hide();
        lock.title = "";
    }

    // Open our new task modal
    $scope.newLockList = function () {
        $scope.ModalLockList.show();
    }

    // Close the new task modal
    $scope.closeNewLockList = function () {
        $scope.ModalLockList.hide();
    }
}])

