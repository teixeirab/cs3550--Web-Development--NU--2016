var q = require("q");
var users = require("./data/user.mock.json");
module.exports = function(uuid, db, mongoose) {

    // load user schema
    var UserSchema = require("./schemas/user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('Users', UserSchema);


    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUsersByIds: findUsersByIds,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
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
        var deferred = q.defer();
        UserModel.find('User', function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function createUser(user) {
        var newUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email,
            role: user.role
        };

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(newUser, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function deleteUserById(userId){
        var deferred = q.defer();
        UserModel.findByIdAndRemove(userId, function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(user, userId){

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.findByIdAndUpdate(userId, user, {new: true}, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
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
        var deferred = q.defer();

        // find all users in array of user IDs
        UserModel.find({
            _id: {$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

};