angular.module('service.Locklist', [])

.service('LocklistsServ', ['$localStorage', '$http', '$ionicPopup', 'AuthService','$q', '$state', function($localStorage, $http, $ionicPopup, AuthService, $q, $state){

    var locklists = undefined;

    // ================================================================

    var askForLockList = function() {
        io.socket.on('connect', function() {
            console.log('connected to sails');
            io.socket.post('/ListLocksForUser', { token: $localStorage.Token }, function(data, jwres) {
                console.log(data);
                console.log(jwres);
                locklists = data;
            })
            io.socket.on('lock', function(msg) {
                console.log(msg);
            })
        })
    }

    askForLockList();

    this.getLocklist = function(){
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        if (locklists == undefined) {
            askForLockList();
            return locklists;
        }
        else {
            return locklists;
        }
    }

    this.getLock = function (lockid) {
        if (locklists == undefined) {
            $state.go('app.locklists');
        }
        else
        {
            return getlockbyID(lockid);
        }
    }
    
    this.toggleLock = function (lockid, lockIsOpen){
        req =   {
            method: 'POST',
            url: 'http://10.33.0.16:1337/ChangeIsOpen',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: { 
                id: lockid,
                isOpen: lockIsOpen,  
            }
        }
       
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        var defer = $q.defer();

        // connection au serveur pour récupérer les listes des serrures d'un utilisateur
        var success = function(result){
            return defer.resolve(result);
        }
        var error = function(err){
            return defer.reject(err);
        }

        $http(req).then(success,error);
        return defer.promise;
    }
    
    this.getIsLock = function (lockid) {
        if (locklists == undefined) {
            $state.go('app.locklists');
        }
        else
        {
            return getlockbyID(lockid).isOpen;
        }
    }

    this.addnewlock = function (lock_title) {

        req =   {
            method: 'POST',
            url: 'http://10.33.0.16:1337/AddLockForUser',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: { 
                nameLock: lock_title,  
            }
        }
       
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        var defer = $q.defer();

        // connection au serveur pour récupérer les listes des serrures d'un utilisateur
        var success = function(result){
            return defer.resolve(result);
        }
        var error = function(err){
            return defer.reject(err);
        }

        $http(req).then(success,error);
        return defer.promise;
    }

    /*this.rename(nameLock,id){
         req =   {
            method: 'POST',
            url: 'http://10.33.0.16:1337/ChangeNameLock',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: { 
                idUser: lock.nameLock,
                idLock: lock_id,  
            }
        }

        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        var defer = $q.defer();

        // connection au serveur pour renommer la serrure de l'utilisateur
        var success = function(result){
            console.log(result);
            return defer.resolve(result);
        }
        var error = function(err){
            return defer.reject(err);
        }

        $http(req).then(success,error);
        return defer.promise;
    }*/


    this.deletelock = function (lock_id) {

        req =   {
            method: 'POST',
            url: 'http://10.33.0.16:1337/DeleteLockForUser',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: { 
                idLock: lock_id,  
            }
        }
       
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        var defer = $q.defer();

        // connection au serveur pour récupérer les listes des serrures d'un utilisateur
        var success = function(result){
            return defer.resolve(result);
        }
        var error = function(err){
            return defer.reject(err);
        }

        $http(req).then(success,error);
        return defer.promise;
    }

    this.getUserList = function (lock_id) {

        req =   {
            method: 'POST',
            url: 'http://10.33.0.16:1337/ListUsersForLock',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: { 
                id: lock_id,  
            }
        }
       
        // defer = la promesse, ce qui sera mis dans le defer.resolve/.reject va devenir ce que la promesse affichera
        var defer = $q.defer();

        // connection au serveur pour récupérer les listes des serrures d'un utilisateur
        var success = function(result){
            return defer.resolve(result.data);
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
