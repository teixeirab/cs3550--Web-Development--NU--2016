var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, formModel, userModel) {

    var auth = authorized;
    var admn = isAdmin;
    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/profile/:userId", auth, profile);
    app.put("/api/assignment/user/:userId", auth, update);
    app.get("/api/assignment/user", auth, users);
    // admin requests
    app.post("/api/assignment/admin/user", auth, admn, create);
    app.get("/api/assignment/admin/user",auth, admn, users);
    //app.get("/api/assignment/admin/user/:userId",auth, admn,  findUserId);
    app.delete("/api/assignment/admin/user/:userId", auth, admn, delete_user);
    app.put("/api/assignment/admin/user/:userId", auth, admn,  update);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done){
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user){
                    if (!user){
                        return done(null, false);}
                        return done(null, user);
                },
                function(err){
                    if (err) {return done(err);}
                }
            )
    }

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null,user);
                },
                function(err){
                    done(err, null);
                }
            )
    }

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function delete_user(req, res) {
        var userId = req.params.userId;
        var users = userModel.deleteUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function users(req, res){
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function profile(req, res) {
        var userId = req.params.userId;

        // use model to find user by id
        userModel.findUserById(userId)
            .then(
                // first retrieve the user by user id
                function (doc) {
                    return doc;
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function register(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(req, res, next){
        if(req.user.roles != 'admin'){
            res.send(403);
        }
        else {
            next();
        }
    }

    function update(req, res) {
        var newUser = req.body;
        var userId = req.params.userId;

        userModel
            .updateUser(newUser, userId)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function create(req, res){
        var user = req.body;
        var users = userModel.createUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

};