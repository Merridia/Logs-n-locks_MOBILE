angular.module('service.Locklist', [])

.service('LocklistsServ', ['$localStorage', '$http', '$ionicPopup', 'AuthService','$q', function($localStorage, $http, $ionicPopup, AuthService,$q){

    var locklists = undefined;
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

    // ================================================================

    this.getLocklist = function(){
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        var defer = $q.defer();

        // connection au serveur pour récupérer les listes des serrures d'un utilisateur
        var success = function(result){
            locklists = result.data;
            return defer.resolve(result.data);
        }
        var error = function(err){
            return defer.reject(err);
        }

        $http(req).then(success,error);
        return defer.promise;
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
}]);

