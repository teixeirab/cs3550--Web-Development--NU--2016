module.exports = function(app, userModel, gameModel, companyModel, portfolioModel) {

    app.get("/api/project/game", findAllGames);
    app.get("/api/project/game/:userId", findGamesForUser);
    app.post("/api/project/game", createGame);
    app.delete("/api/project/game/:gameId", deleteGame);
    app.put("/api/project/game/:gameId", updateGame);
    app.get("/api/project/game/search/:text", findAllGamesByText);

    function findAllGamesByText(req, res){
        var text = req.params.text;
        var games = gameModel.findAllGamesByText(text);
        res.json(games);
    }

    function findAllGames(req, res) {
        var games = gameModel.findAllGames()
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

    function findGamesForUser(req, res) {
        var user = req.params.userId;
        var games = gameModel.findAllGamesForUser(user)
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

    function createGame(req, res) {
        var user = req.body;
        var games = gameModel.createGame(user)
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

    function deleteGame(req, res) {
        var gameId = req.params.gameId;
        var games = gameModel.deleteGame(gameId)
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

    function updateGame(req, res) {
        var gameId = req.params.gameId;
        var newGame = req.body;
        var games = gameModel.updateGame(gameId, newGame)
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
}


