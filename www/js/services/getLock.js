angular.module('Starter.Service.getLock', [])
// gestion d'une SERRURE ici
.service('Lock_serv', function($scope) {
    var tasks = [
      { title: 'Collect coins' },
      { title: 'Eat mushrooms' },
      { title: 'Get high enough to grab the flag' },
      { title: 'Find the Princess' }
    ];

    this.getTask = function() {
    	return tasks;
    }
})