angular.module('Service.LockSettings', [])

.service('lockListSettingsServ', ['$localStorage', '$http', '$ionicPopup', 'AuthService', '$q', '$stateParams', 'LocklistsServ', function ($localStorage, $http, $ionicPopup, AuthService, $q, $stateParams, LocklistsServ) {

    var server_url = 'http://10.33.1.46:1337';
    console.log($stateParams.lockid);
    var locklists = LocklistsServ.getlockbyID($stateParams.lockid);
    var userlists = LocklistsServ.getUserList($stateParams.lockid);

    console.log("Liste que l'on veut :" + userlists);
}]);