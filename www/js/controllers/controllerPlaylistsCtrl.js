angular.module('controller.PlaylistsCtrl', [])

.controller('PlaylistsCtrl', ['$scope', '$ionicModal', 'PlaylistsServ', function($scope, $ionicModal, PlaylistsServ) {
    
    $scope.playlists = PlaylistsServ.getPlaylist();

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('templates/new_lock_list.html', function (modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Called when the form is submitted
    $scope.createLockList = function (lock) {
        $scope.playlists.push({
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


