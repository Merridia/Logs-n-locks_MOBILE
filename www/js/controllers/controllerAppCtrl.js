angular.module('controller.AppCtrl', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, AuthService) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    //Disconnect the user
    $scope.logOutUser = function(){
        AuthService.isLogOut();
        $state.go('app.login');
    };

    //Show or hide button if Loggin/loggout
    $scope.LogInOrOut = function () {
        return (AuthService.isLoggedIn());
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    // Create our modal
    $ionicModal.fromTemplateUrl('templates/new_lock_list.html', function (modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope
    });

    //$route.reload(); A ajouter pour reload automatiquement les pages a chaque changements o/
});