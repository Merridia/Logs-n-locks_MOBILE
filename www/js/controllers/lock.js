angular.module('App.controllers.lock', [])
    // Controlleur d'une SERRURE ici
.controller('LockCtrl', function ($scope) {
    $scope.tasks = [
      { title: 'Collect coins' },
      { title: 'Eat mushrooms' },
      { title: 'Get high enough to grab the flag' },
      { title: 'Find the Princess' }
    ];
})

.controller('LockCtrl', function ($scope, $ionicModal) {
    // No need for testing data anymore
    $scope.tasks = [];

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('new-task.html', function (modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Called when the form is submitted
    $scope.createTask = function (task) {
        $scope.tasks.push({
            title: task.title
   });
        $scope.taskModal.hide();
        task.title = "";
    };

    // Open our new task modal
    $scope.newTask = function () {
        $scope.taskModal.show();
    };

    // Close the new task modal
    $scope.closeNewTask = function () {
        $scope.taskModal.hide();
    };

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/playlists');
});

