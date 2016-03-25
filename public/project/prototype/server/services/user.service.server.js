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
        var users = userModel.getUsersByText(text);
        res.json(users);
    }

    function addUserInGame(req, res){
        var user = req.body;
        var userGame = req.param.userGame;
        var result = userModel.addUserInGame(user, userGame);
        res.json(result);
    }

    function delete_user(req, res){
        var userId = req.params.userId;
        var users = userModel.deleteUserById(userId);
        res.json(users);
    }

    function users(req, res){
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function addUser(req, res){
        var user = req.body;
        var users = userModel.addUser(user);
        res.json(users);
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
        var users = userModel.updateUser(user, userId);
        res.json(users);
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