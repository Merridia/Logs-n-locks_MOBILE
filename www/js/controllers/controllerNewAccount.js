angular.module('controller.CreateNewAccount', [])

.controller('CreateNewAccountCtrl', ['$scope', '$ionicPopup', '$http', '$ionicModal', 'AuthService', '$q', function ($scope, $ionicPopup, $http, $ionicModal, AuthService, $q) {

    var server_url = 'http://10.33.1.46:1337'; // 'http://10.33.0.16:1337'; 

    // ================================================================
    // create New Account
    $scope.createNewAccount = function (AccountData) {
        req = {
            method: 'POST',
            url: server_url + '/AddUser',
            headers: {
                'authorization': undefined,
            },
            data: {
                firstname: AccountData.Firstname,
                lastname: AccountData.Lastname,
                email: AccountData.Email,
                password: AccountData.Password,
            }
        }
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        //var defer = $q.defer();
        //console.log(AccountData);
        // connection au serveur pour récupérer les listes des serrures d'un utilisateur
        var success = function (result) {
            $scope.userList = result.data;
            //return defer.resolve(result);
            console.log(result);
            $ionicPopup.alert({
                title: 'New Account create',
                template: result,
            });
        }
        var error = function (err) {
            //return defer.reject(err);
        }
        $http(req).then(success, error);
       // return defer.promise;
    };
    // ================================================================

}]);