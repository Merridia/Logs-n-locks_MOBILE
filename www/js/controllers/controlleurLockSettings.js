angular.module('controller.LockSettingsCtrl', [])

.controller('LockSettingsCtrl', ['$scope','$stateParams', 'LocklistsServ', function ($scope, $stateParams,LocklistsServ) {

    $scope.lock = LocklistsServ.getlockbyID($stateParams.lockid)
    console.log($scope.user);
    console.log($stateParams.lockid);

    //controlleur pour renommer
    $scope.rename = function (nameLock, id) {
        LocklistsServ.rename(nameLock, id)
    };
    /* --OPTION--
    //controlleur pour ajouter un delai de fermeture du lock 
    $scope.setClock = function () {

    }; */
}]);