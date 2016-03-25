var users = require("./data/user.mock.json");
module.exports = function(uuid) {
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUsersByIds: findUsersByIds,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        addUser: addUser,
        getUsersByText : getUsersByText
    };
    return api;

    function getUsersByText(text){
        var temp = [];
        for (var u in users) {
            if (users[u].username === text ||
                users[u].firstName === text ||
                users[u].lastName === text ||
                users[u].email === text ||
                users[u].roles === text) {
                temp.push(users[u]);
            }
        }
        return temp;
    }

    function findAllUsers(){
        return users;
    }

    function createUser(user) {
        user._id = uuid.v4();
        user.role = "player";
        users.push(user);
        return user;
    }

    function deleteUserById(userId){
        for (var u in users) {
            if (users[u]._id === userId) {
                users.splice(u, 1);
            }
        }
        return users;
    }

    function findUserByCredentials(credentials) {
        for(var u in users) {
            if( users[u].username === credentials.username &&
                users[u].password === credentials.password) {
                return users[u];
            }
        }
        return null;
    }

    function findUserById(userId) {
        for(var u in users) {
            if(users[u]._id === userId) {
                return users[u];
            }
        }
        return null;
    }

    function updateUser(user, userId){
        for (var u in users) {
            if (users[u]._id === userId) {
                users[u] = user;
            }
        }
        console.log(userId)
        return users;
    }

    function findUserByUsername (username){
        for(var u in users) {
            if( users[u].username === username) {
                return users[u];
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

    function addUser(user){
        var newUser = {
            _id: uuid.v4(),
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            roles: user.roles
        };
        users.push(newUser);
        return users;
    }

};