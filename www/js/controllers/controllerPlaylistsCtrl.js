angular.module('controller.PlaylistsCtrl', [])

.controller('PlaylistsCtrl', ['$scope', 'PlaylistsServ', function($scope, PlaylistsServ) {
  $scope.playlists = PlaylistsServ.getPlaylist();
}])


