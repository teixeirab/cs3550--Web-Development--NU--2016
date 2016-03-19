var mock = require("./user.mock.json");
module.exports = function(uuid) {
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUsersByIds: findUsersByIds,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers
    };
    return api;

    function findAllUsers(){
        return mock;
    }

    function createUser(user) {
        user._id = uuid.v4();
        user.role = "student";
        mock.push(user);
        return user;
    }

    function deleteUserById(userId){
        for (var u in users) {
            if (users[u]._id === id) {
                users.splice(u, 1);
            }
        }
        return users;
    }

    function findUserByCredentials(credentials) {
        for(var u in mock) {
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserById(userId) {
        for(var u in mock) {
            if(mock[u]._id === userId) {
                return mock[u];
            }
        }
        return null;
    }

    function updateUser(user, userId){
        for (var u in mock) {
            if (mock[u]._id === parseInt(userId)) {
                mock[u] = user;
            }
        }
        return mock;
    }

    function findUserByUsername (username){
        for(var u in mock) {
            if( mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function findUsersByIds (userIds) {
        var users = [];
        for (var u in userIds) {
            var user = findUserById (userIds[u]);
            if (user) {
                users.push ({
                    username: user.username,
                    _id: user._id
                });
            }
        }
        return users;
    }

};