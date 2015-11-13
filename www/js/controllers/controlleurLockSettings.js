angular.module('controller.LockSettingsCtrl', [])

.controller('LockSettingsCtrl', ['$scope', '$stateParams', '$ionicModal', 'LocklistsServ', 'lockListSettingsServ', function ($scope, $stateParams, $ionicModal, LocklistsServ, lockListSettingsServ) {

    $scope.lock = LocklistsServ.getlockbyID($stateParams.lockid);

    //controlleur to add a user to a lock
    $scope.AddUserToLock = function (email, idlock) {
        LocklistsServ.addUsertoLock(email, idlock)
    };

    /*-- Rename lock modal*/

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('templates/renameLock.html', function (modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    })

    //controlleur to rename a lock
    $scope.rename = function (nameLock) {
        LocklistsServ.rename(nameLock, $stateParams.lockid);
        // Called the model when the form is submitted
        $scope.taskModal.hide();
    };
    // Open our new task modal
    $scope.newLockName = function () {
        $scope.taskModal.show();
    }

    // Close the new task modal
    $scope.closeNewLockName = function () {
        $scope.taskModal.hide();
    }
    
    /* --OPTION--
    //controlleur pour ajouter un delai de fermeture du lock 
    $scope.setClock = function () {
    };*/

}]);