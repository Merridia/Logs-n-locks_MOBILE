// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('App.controllers.lock', 'App.controllers.groupOfLock', 'App.controllers.locksave', 'App.controllers.user', 'Starter.Service.getLock', 'Starter.Service.getUser', ['ionic'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    })

       // Ajout des chemin vers les pages et les controlleur ici
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'LockCtrl'
      })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.settings', {
        url: '/settings',
        views: {
            'menuContent': {
                templateUrl: 'templates/settings.html'
            }
        }
    })
      .state('app.lockslist', {
          url: '/lockslist',
          views: {
              'menuContent': {
                  templateUrl: 'templates/lockslist.html',
                  controller: 'groupOfLockCrtl'
              }
          }
      })

    .state('app.lock', {
        url: '/lockslist/lock',
        views: {
            'menuContent': {
                templateUrl: 'templates/lock.html',
                controller: 'groupOfLockCrtl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/lockslist');
    });
});