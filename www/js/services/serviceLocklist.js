angular.module('service.Locklist', [])

.service('LocklistsServ', ['$localStorage', '$http', '$ionicPopup', 'AuthService','$q', function($localStorage, $http, $ionicPopup, AuthService,$q){

    var locklists = undefined;

    // ================================================================

    this.getLocklist = function(){
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        var defer = $q.defer();

        // connection au serveur pour récupérer les listes des serrures d'un utilisateur
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
    
    this.toggleLock = function (lockid, lockIsOpen){
        req =   {
            method: 'POST',
            url: 'http://localhost:1337/AddLockForUser',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: { 
                idUser: $localStorage.User.id,
                isOpen: lockIsOpen,  
            }
        }
       
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        var defer = $q.defer();

        // connection au serveur pour récupérer les listes des serrures d'un utilisateur
        var success = function(result){
            console.log(result);
            return defer.resolve(result);
        }
        var error = function(err){
            return defer.reject(err);
        }

        $http(req).then(success,error);
        return defer.promise;
    }
    
    this.getIsLock = function (lockid) {
        return getlockbyID(lockid).isOpen;
    }

    this.addnewlock = function (lock_title) {

        req =   {
            method: 'POST',
            url: 'http://localhost:1337/AddLockForUser',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: { 
                idUser: $localStorage.User.id,
                nameLock: lock_title,  
            }
        }
       
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        var defer = $q.defer();

        // connection au serveur pour récupérer les listes des serrures d'un utilisateur
        var success = function(result){
            console.log(result);
            return defer.resolve(result);
        }
        var error = function(err){
            return defer.reject(err);
        }

        $http(req).then(success,error);
        return defer.promise;
    }

    this.deletelock = function (lock_id) {

        req =   {
            method: 'POST',
            url: 'http://localhost:1337/DeleteLockForUser',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: { 
                idUser: $localStorage.User.id,
                idLock: lock_id,  
            }
        }
       
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        var defer = $q.defer();

        // connection au serveur pour récupérer les listes des serrures d'un utilisateur
        var success = function(result){
            console.log(result);
            return defer.resolve(result);
        }
        var error = function(err){
            return defer.reject(err);
        }

        $http(req).then(success,error);
        return defer.promise;
    }

    getlockbyID = function(lockid) {
        for (var i = locklists.length - 1; i >= 0; i--) {
            if (locklists[i].id == lockid) {
                return locklists[i];
            }
        };
    }
}]);
