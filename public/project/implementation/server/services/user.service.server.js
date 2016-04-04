module.exports = function(app, userModel, gameModel, companyModel, portfolioModel) {

    app.post("/api/project/login", login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.post("/api/project/add", addUser);
    app.get("/api/project/profile/:userId", profile);
    app.put("/api/project/user/:userId", update);
    app.get("/api/project/user", users);
    app.delete("/api/project/user/:userId", delete_user);
    app.post("/api/project/add/:userGame", addUserInGame);
    app.get("/api/project/user/all/:text", getUsersByText);

    function getUsersByText(req, res){
        var text = req.params.text;
        var users = userModel.getUsersByText(text)
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
        var result = userModel.addUserInGame(user, userGame)
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
        var users = userModel.findAllUsers()
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
        console.log(user);
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

    function register(req, res) {
        var user = req.body;

        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function update(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        user = userModel.updateUser(user, userId)
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

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
};