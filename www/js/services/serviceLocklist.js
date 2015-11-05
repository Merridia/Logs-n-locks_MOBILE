angular.module('service.Locklist', [])

.service('LocklistsServ', function($localStorage, $http, $ionicPopup){
    
    req =   {
                method: 'POST',
                url: 'http://localhost:1337/ListLocksForUser',
            headers: {
                'authorization': $localStorage.Token,
            },
                data: { 
                        id: $localStorage.User.id,  
                    }
            }

    var success = function(result){
        console.log(result);

    }

    var error = function(err){
        $ionicPopup.alert({
            title: err.statusText,
            template: err.data.err
        });
    }

    $http(req).then(success,error);


    var locklists = [];

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

