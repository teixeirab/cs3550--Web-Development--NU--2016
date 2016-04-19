module.exports = function(app, formModel, userModel, bcrypt) {

    var auth = authorized;
    var admn = isAdmin;

    app.get("/api/assignment/profile/:userId", auth, profile);
    app.put("/api/assignment/user/:userId", auth, update);
    app.get("/api/assignment/user", auth, users);
    // admin requests
    app.post("/api/assignment/admin/user", auth, admn, create);
    app.get("/api/assignment/admin/user",auth, admn, users);
    app.get("/api/assignment/admin/user/:userId",auth, admn,  profile);
    app.delete("/api/assignment/admin/user/:userId", auth, admn, delete_user);
    app.put("/api/assignment/admin/user/:userId", auth, admn,  update);

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
        user.password = bcrypt.hashSync(user.password);
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