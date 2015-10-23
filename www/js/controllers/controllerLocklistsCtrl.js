angular.module('controller.LocklistsCtrl', [])

.controller('LocklistsCtrl', ['$scope', 'LocklistsServ', function($scope, LocklistsServ) {
  $scope.locklists = LocklistsServ.getLocklist();
}])


