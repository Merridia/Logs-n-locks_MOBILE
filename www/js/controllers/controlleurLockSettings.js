angular.module('controller.LockSettingsCtrl', [])

.controller('LockSettingsCtrl', ['$route','$scope', '$stateParams', 'LocklistsServ', function ($route,$scope, $stateParams, LocklistsServ) {
    $scope.rename;
    //controlleur pour renommer
    $scope.addUser;
    //controlleur pour ajouter un utilisateur au lock
    $scope.setClock;
    //controlleur pour ajouter un delai de fermeture du lock -- OPTION --
    $route.reload();
}]);