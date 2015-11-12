angular.module('Service.LockSettings', [])

.service('LocklistsServ', ['$localStorage', '$http', '$ionicPopup', 'AuthService','$q', '$state', function($localStorage, $http, $ionicPopup, AuthService, $q, $state){

    var server_url = 'http://10.33.0.16:1337';
    var locklists;

    //add a usere to a lock
    this.AddUserForLock = function (idlock, mail) {
        req = {
            method: 'POST',
            url: server_url + '/api/AddUserForLock',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: {
                email: mail,
                idLock: idlock
            }
        }

        var success = function (result) {
            if (result.statusText == "OK") {
                console.log(result.statusText);
            }
        }

        var error = function (err) {
            $ionicPopup.alert({
                title: err.statusText,
                template: err.data.err
            });
        }

        $http(req).then(success, error);
    }
}]);