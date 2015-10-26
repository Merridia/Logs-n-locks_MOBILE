angular.module('service.Locklist', [])

.service('LocklistsServ', function(){
    var locklists = [
      { title: 'Entree', id: 0 , isOpen: true},
      { title: 'Garage', id: 1 , isOpen: false},
      { title: 'Bureau', id: 2 , isOpen: true}
    ];

    this.getLocklist = function(){
        return locklists;
    }

    this.getLock = function (lockid) {
        return locklists[lockid];
    }
    
    this.toggleLock = function (lockid){
        locklists[lockid].isOpen = !locklists[lockid].isOpen;
    }
    
    this.getIsLock = function (lockid) {
        return locklists[lockid].isOpen;
    }

    this.addnewlock = function (lock_title) {
        // /!\ Faire attention au erreur avec le locklists.length (2 id identique)
        locklists[locklists.length] = {title: lock_title, id: locklists.length, isOpen: false};
    }
});

