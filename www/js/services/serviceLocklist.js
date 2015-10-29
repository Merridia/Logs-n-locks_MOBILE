angular.module('service.Locklist', [])

.service('LocklistsServ', function(){
    var locklists = [
      { title: 'Entree', id: 0 , isOpen: true},
      { title: 'Garage', id: 1 , isOpen: false},
      { title: 'Bureau', id: 2 , isOpen: true},
      { title: 'Chambre', id: 3 , isOpen: false},
      { title: 'Reserve', id: 4 , isOpen: false},
    ];

    var id_cursor = 5;

    this.getLocklist = function(){
        return locklists;
    }

    this.getLock = function (lockid) {
        for (var i = locklists.length - 1; i >= 0; i--) {
            if (locklists[i].id == lockid) {
                return locklists[i];
            }
        };
    }
    
    this.toggleLock = function (lockid){
        locklists[lockid].isOpen = !locklists[lockid].isOpen;
    }
    
    this.getIsLock = function (lockid) {
        return locklists[lockid].isOpen;
    }

    this.addnewlock = function (lock_title) {
        // /!\ Faire attention au erreur avec le locklists.length (2 id identique)
        locklists[id_cursor] = {title: lock_title, id: id_cursor, isOpen: false};
        id_cursor ++;
    }

    this.deletelock = function (lock) {
        locklists.splice(locklists.indexOf(lock), 1);
    }
});

