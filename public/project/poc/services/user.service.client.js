(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
                 users: [
                     {"_id":123, "firstName":"Alice", "lastName":"Wonderland", "username":"alice","password":"alice",
                         "role": "player", "email": "a@gmail.com"},
                     {"_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob",
                         "role": "admin", "email": "b@gmail.com"},
                     {"_id":345, "firstName":"Charlie","lastName":"Brown", "username":"charlie","password":"charlie",
                         "role": "player", "email": "c@gmail.com"},
                     {"_id":456, "firstName":"Dan","lastName":"Craig", "username":"dan", "password":"dan",
                         "role": "player", "email": "d@gmail.com"},
                     {"_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed",
                         "role": "player", "email": "e@gmail.com"}
                 ],
            findUserByCredentials : findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByUsername : findUserByUsername,
            findUserByName : findUserByName,
            findUserById : findUserById,
            deleteUserByUsername: deleteUserByUsername
        };
        return model;

        function findUserByUsername(username, callback) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    callback(model.users[u]);
                }
            }
            callback (null);
        }

        function findUserByName(username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function createUser (user, callback) {
            var now = new Date().getTime();
            var id = "id-"+now;
            var role;
            if (user.type1){role = "admin";}
            if (user.type2){role = "player"}

            var user = {
                _id: id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                role : role

            };
            model.users.push(user);
            callback(user);
        }


        function findUserByCredentials(username, password, callback) {
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    callback (model.users[u]);
                }
            }
            callback(null);
        }

        function findUserId (userId){
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    return (model.users[u]);
                }
            }
            return (null);
        }

        function updateUser (userId, user, callback) {
            var userOld = model.findUserId (userId);
            if (user != null) {
                userOld.firstName = user.firstName;
                userOld.lastName = user.lastName;
                userOld.lastName = user.lastName;
                userOld.password = user.password;
                userOld.email = user.email;
                callback(user);
            } else {
                callback(null);
            }
        }

        function findUserById(userId){
            for (var u in model.users) {
                if (model.users[u].username === userId) {
                    return model.users[u];
                }
            }
            return null;
        }

        function deleteUserByUsername (username, callback) {
            var users = model.users;
            for (var u in users) {
                if (users[u].username === username) {
                    users.splice(u, 1);
                    callback(model.users);
                }
            }
        }


        function deleteUserById (userId, callback) {
            var users = model.users;
            for (var u in users) {
                if (users[u]._id === userId) {
                    users.splice(u, 1);
                    callback(model.users);
                }
            }
        }

        function findAllUsers(callback){
            callback(model.users);
        }
    }
})();


