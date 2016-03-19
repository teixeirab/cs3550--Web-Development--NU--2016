module.exports = function(app, formModel, userModel) {

    /*
        I decided to use Prof. Jose implementation of user login similarly to the OMDB app because I thought it was a
        better implementation that the one that it was being required for us in this assignment. This way I already have
        a session going on and I do not have to worry about handling with unnecessary arguments being passed through the
        http requests. Hope that is a reasonable choice to you.
    */

    app.post("/api/assignment/login", login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/profile/:userId", profile);
    app.put("/api/assignment/user/:userId", update);
    app.get("/api/assignment/user", users);
    app.delete("/api/assignment/user/:id", delete_user);

    function delete_user(req, res){
        var userId = req.params.userId;
        var users = userModel.deleteUserById(userId)
    }

    function users(req, res){
        var users = userModel.findAllUsers();
        res.json(users );
    }

    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function update(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        user = userModel.updateUser(user, userId);
        res.json(user);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
};