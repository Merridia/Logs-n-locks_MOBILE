// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'Service.Authentificate','ngStorage', 'controller.LocklistsCtrl',
    'controller.LocklistCtrl', 'controller.AppCtrl', 'service.Locklist', 'controllers.User'])

.run(function ($ionicPlatform, AuthService, $rootScope, $state) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    // Redirection de l'utilisateur suivant s'il est loggé ou non 
    $rootScope.$on("$stateChangeStart", function (event, toState, ToParams, fromState, fromParams) {

        if (toState.authentificate) {
            if (AuthService.isLoggedIn() == false) {
                $state.go('app.login');
            }
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl',
          authentificate: false
      })

        //login view
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'UserCtrl',
            }
        },
        authentificate: false
    })

        //npm install -- save ng storage
      .state('app.locklists', {
          url: '/lockslists',
          views: {
              'menuContent': {
                  templateUrl: 'templates/locklists.html',
                  controller: 'LocklistsCtrl',
              }
          },
          authentificate: true
      })

        // show a lock info
    .state('app.single', {
        url: '/lockslists/:locklistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/locklist.html',
                controller: 'LocklistCtrl',
            }
        },
        authentificate: true
    })

        //show a lock settings
    .state('app.LockSetting', {
        url: '/lockslists/:locklistId/settings',
        views: {
            'menuContent': {
                templateUrl: 'templates/settings.html',
                controller: 'LocklistCtrl',
            }
        },
        authentificate: true
    });
    
// if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login')
  });
