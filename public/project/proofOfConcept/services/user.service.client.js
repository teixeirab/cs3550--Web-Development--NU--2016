/**
 * Created by becogontijo on 2/22/2016.
 */
(function(){
    angular
        .module("SimulationApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
                 users: [
                     {"_id":123, "firstName":"Alice", "lastName":"Wonderland", "username":"alice","password":"alice",
                         "roles": ["student"], "email": "a@gmail.com"},
                     {"_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob",
                         "roles": ["admin"], "email": "b@gmail.com"},
                     {"_id":345, "firstName":"Charlie","lastName":"Brown", "username":"charlie","password":"charlie",
                         "roles": ["faculty"], "email": "c@gmail.com"},
                     {"_id":456, "firstName":"Dan","lastName":"Craig", "username":"dan", "password":"dan",
                         "roles": ["faculty", "admin"], "email": "d@gmail.com"},
                     {"_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed",
                         "roles": ["student"], "email": "e@gmail.com"}
                 ],

            findUserByCredentials : findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByUsername : findUserByUsername
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
        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function createUser (user, callback) {
            var user = {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password
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
                if (model.users[u].id === userId) {
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


        function deleteUserById(userId, callback){
            var user = model.findUserByUsername (userName);
            user.empty();
        }

        function findAllUsers(callback){
            callback(model.users);
        }
    }
})();


