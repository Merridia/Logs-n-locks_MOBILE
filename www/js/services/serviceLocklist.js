angular.module('service.Locklist', [])

.service('LocklistsServ', ['$localStorage', '$http', '$ionicPopup', 'AuthService','$q', '$state', function($localStorage, $http, $ionicPopup, AuthService, $q, $state){

    var server_url = 'http://10.33.0.16:1337';
    var locklists;

    // ================================================================
    
    //Get toggle status
    this.toggleLock = function (lockid, lockIsOpen){
        req =   {
            method: 'POST',
            url: server_url + '/ChangeIsOpen',
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

    this.sendList = function(list) {
        locklists = list;
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

    // ================================================================
    //Add a new lock
    this.addnewlock = function (lock_title) {

        req =   {
            method: 'POST',
            url: server_url + '/AddLockForUser',
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
    };

    // ================================================================
    // rename a lock
    this.rename = function(nameLock, id){
        req =   {
            method: 'POST',
            url: server_url + '/ChangeNameLock',
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
    }

    // ================================================================
    // delete a lock
    this.deletelock = function (lock_id) {

        req =   {
            method: 'POST',
            url: server_url + '/DeleteLockForUser',
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

    // ================================================================
    // Get the list of all user of a lock
    this.getUserList = function (lock_id) {

        req =   {
            method: 'POST',
            url: server_url + '/ListUsersForLock',
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
        var success = function (result) {
            console.log(result);
            return defer.resolve(result.data);
        }
        var error = function(err){
            return defer.reject(err);
        }

        $http(req).then(success,error);
        return defer.promise;
    }

    // ================================================================
    // Get lock by its ID
    this.getlockbyID = function(lockid) {
        for (var i = locklists.length - 1; i >= 0; i--) {
            if (locklists[i].id == lockid) {
                console.log(locklists[i]);
                return locklists[i];
            }
        };
    }
}]);
