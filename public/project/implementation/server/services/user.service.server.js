module.exports = function(app, userModel, gameModel, companyModel, portfolioModel, bcrypt) {

    var auth = authorized;
    var admn = isAdmin;
    var creator = isCreator;
    app.get("/api/project/profile/:userId",auth, profile);
    app.put("/api/project/user/:userId",auth, update);
    app.post("/api/project/add/:userGame", addUserInGame);
    app.get("/api/project/user/all/:text", auth, creator,  getUsersByText);
    // admin requests
    app.post("/api/project/add",auth, admn, addUser);
    app.get("/api/project/user",auth, users);
    app.delete("/api/project/user/:userId",auth, admn, delete_user);

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

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isAdmin(req, res, next){
        if(req.user.role != 'admin'){
            res.send(403);
        }
        else {
            next();
        }
    }

    function isCreator(req, res, next){
        if(req.user.role != 'creator'){
            res.send(403);
        }
        else {
            next();
        }
    }
};