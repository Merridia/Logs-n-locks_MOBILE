angular.module('service.Locklist', [])

.service('LocklistsServ', ['$localStorage', '$http', '$ionicPopup', 'AuthService','$q', '$state', function($localStorage, $http, $ionicPopup, AuthService, $q, $state){

    var server_url = 'http://10.33.1.46:1337';
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

    // ================================================================
    //Add a User for a lock
    this.addUsertoLock = function (email, idlock) {
        
        req = {
            method: 'POST',
            url: server_url + '/AddUserForLock',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: {
                email: email,
                idLock: idlock
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

        $http(req).then(success, error);
        return defer.promise;
    };

    // ================================================================
    //Add a User for a lock
    this.removeUserOnLock = function (iduser, idlock) {
        console.log("test");
        io.socket.post('/DeleteUserForLock', { token: $localStorage.Token, idUser: iduser, idLock: idlock })
    };

    // ================================================================
    // rename a lock
    this.rename = function (namelock, id) {
        console.log("Name= ", namelock ,"Id lock=", id)
        req =   {
            method: 'POST',
            url: server_url + '/ChangeNameLock',
            headers: {
                'authorization': $localStorage.Token,
            },
            data: { 
                nameLock: namelock,
                id: id,  
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
            console.log("La porte à était bien retiré");
            return defer.resolve(result);
        }
        var error = function(err){
            console.log("err : "+err);
            return defer.reject(err);
        }

        $http(req).then(success,error);
        return defer.promise;
    }

    // ================================================================
    // get logs for a lock
    this.getLogsForLock = function (lock_id) {

        req =   {
            method: 'POST',
            url: server_url + '/ShowLogsForLock',
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
            console.log(err);
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
                return locklists[i];
            }
        };
    }
}]);
