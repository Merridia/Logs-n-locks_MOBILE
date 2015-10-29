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
        return getlockbyID(lockid);
    }
    
    this.toggleLock = function (lockid){
        console.log(getlockbyID(lockid).isOpen);
        getlockbyID(lockid).isOpen = !getlockbyID(lockid).isOpen;
        console.log(getlockbyID(lockid).isOpen);
    }
    
    this.getIsLock = function (lockid) {
        return getlockbyID(lockid).isOpen;
    }

    this.addnewlock = function (lock_title) {
        locklists[id_cursor] = {title: lock_title, id: id_cursor, isOpen: false};
        id_cursor ++;
    }

    this.deletelock = function (lock) {
        locklists.splice(locklists.indexOf(lock), 1);
    }

    getlockbyID = function(lockid) {
        for (var i = locklists.length - 1; i >= 0; i--) {
            if (locklists[i].id == lockid) {
                return locklists[i];
            }
        };
    }
});

