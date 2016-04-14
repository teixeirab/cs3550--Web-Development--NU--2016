module.exports = function(app, userModel, gameModel, companyModel, portfolioModel, passport, isAdmin, authorized, bcrypt) {

    var auth = authorized;
    var admn = isAdmin;
    app.post("/api/project/login", passport.authenticate('local'),  login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/api/project/profile/:userId",auth, profile);
    app.put("/api/project/user/:userId",auth, update);
    app.post("/api/project/add/:userGame", addUserInGame);
    app.get("/api/project/user/all/:text", getUsersByText);
    // admin requests
    app.post("/api/project/add",auth, admn, addUser);
    app.get("/api/project/user",auth, users);
    app.delete("/api/project/user/:userId",auth, admn, delete_user);

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

    function getUsersByText(req, res){
        var text = req.params.text;
        userModel.getUsersByText(text)
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

    function addUserInGame(req, res){
        var user = req.body;
        var userGame = req.param.userGame;
        userModel.addUserInGame(user, userGame)
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

    function delete_user(req, res){
        var userId = req.params.userId;
        userModel.deleteUserById(userId)
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
        userModel.findAllUsers()
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

    function addUser(req, res){
        var user = req.body;
        userModel.createUser(user)
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

    function register(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
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

    function update(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        userModel.updateUser(user, userId)
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
};