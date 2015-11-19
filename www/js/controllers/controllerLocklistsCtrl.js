angular.module('controller.LocklistsCtrl', [])

.controller('LocklistsCtrl', ['$scope', '$ionicModal', '$ionicPopup', '$localStorage', 'LocklistsServ', function($scope, $ionicModal, $ionicPopup, $localStorage, LocklistsServ) {



    io.socket.post('/ListLocksForUser', { token: $localStorage.Token }, function(data, jwres) {
        console.log(data);
        console.log(jwres);

        $scope.locklists = data;
        LocklistsServ.sendList(data);
    })
    io.socket.on('lock',function(msg){
        switch(msg.verb) {
            case 'updated':
                console.log(msg);
                for (var i = $scope.locklists.length - 1; i >= 0; i--) {
                    if ($scope.locklists[i].id == msg.data.lock.id) {
                        $scope.locklists[i] = msg.data.lock;
                    }
                };
                LocklistsServ.sendList($scope.locklists);
                $scope.$apply();
                break;

            case 'created':
                console.log(msg);
                $scope.locklists.push(msg.data.lock);
                LocklistsServ.sendList($scope.locklists);
                $scope.$apply();
                break;

            case 'removedFrom':
                console.log(msg);
                $scope.locklists.splice($scope.locklists.indexOf(msg.data.lock));
                LocklistsServ.sendList($scope.locklists);
                $scope.$apply();
                break;

            default: console.log('error');
        }
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
        io.socket.post('/AddLockForUser', { token: $localStorage.Token, nameLock: lock.title }, function(data, jwres) {
            console.log(data);
            console.log(jwres)

            $scope.locklists.push(data);
            LocklistsServ.sendList($scope.locklists);
        })
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

