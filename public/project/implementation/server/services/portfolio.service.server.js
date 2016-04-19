module.exports = function(app, userModel, gameModel, companyModel, portfolioModel, bcrypt) {

    var auth = authorized;
    var admn = isAdmin;
    app.get("/api/project/portfolio",auth, admn, findAllPortfolio);
    app.get("/api/project/portfolio/:username/:gameName", auth, findPortfolioForUser);
    app.post("/api/project/portfolio", createPortfolio);
    app.delete("/api/project/portfolio/:portfolioId",auth, deletePortfolio);
    app.put("/api/project/portfolio/:portfolioId",auth, updatePortfolio);
    app.get("/api/project/portfolio/all/:text", findAllPortfoliosByText);
    app.post("/api/project/portfolio/trade/:username",auth, tradeCompanyForUser);
    app.post("/api/project/portfolio/advance/:portfolioId/:turn",auth, advanceTurnForGame);
    app.post("/api/project/portfolio/return/:portfolioId/:turn/:turnReturn",auth, updateReturn);
    app.get("/api/project/portfolio/game/find/:gameId",auth, findPortfoliosInGame);
    app.post("/api/project/portfolio/end/:portfolioId", auth, endGameForUser);
    app.post("/api/project/portfolio/find", findPortfoliosInGames);
    app.get("/api/project/portfolio/update/status/:gameId", resetStatusForGame);
    app.post("/api/project/portfolio/update/:portfolioId/:status", setStatusForPortfolio);


    function setStatusForPortfolio(req, res){
        var portfolioId = req.params.portfolioId;
        var status = req.params.status;
        portfolioModel.setStatusForPortfolio(portfolioId, status)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function resetStatusForGame(req, res){
        var gameName = req.params.gameId;
        portfolioModel.resetStatusForGame(gameName)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findPortfoliosInGames(req, res){
        var games = req.body;
        portfolioModel.findPortfoliosInGames(games)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findPortfoliosInGame(req, res) {
        var gameId = req.params.gameId;
        portfolioModel.findPortfoliosInGame(gameId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function endGameForUser(req, res){
        var portfolioId = req.params.portfolioId;
        portfolioModel.endGameForUser(portfolioId)
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

    function updateReturn(req, res){
        var portfolioId = req.params.portfolioId;
        var currentTurn = req.params.turn;
        var turnReturn = req.params.turnReturn;
        portfolioModel.updateReturn(portfolioId, currentTurn, turnReturn)
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

    function advanceTurnForGame(req, res){
        var portfolioId = req.params.portfolioId;
        var currentTurn = req.params.turn;
        portfolioModel.advanceTurnForGame(portfolioId, currentTurn)
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


    function tradeCompanyForUser(req, res){
        var username = req.params.username;
        var portfolioTrade = req.body;
        portfolioModel.tradeCompanyForUser(username, portfolioTrade)
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

    function findAllPortfoliosByText(req, res){
        var text = req.params.text;
        portfolioModel.findAllPortfoliosByText(text)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findAllPortfolio(req, res) {
        portfolioModel.findAllPortfolios()
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

    function findPortfolioForUser(req, res) {
        var username = req.params.username;
        var gameName = req.params.gameName
        portfolioModel.findPortfoliosForUser(username, gameName)
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

    function createPortfolio(req, res) {
        var user = req.body;
        portfolioModel.createPortfolio(user)
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

    function deletePortfolio(req, res) {
        var portfolioId = req.params.portfolioId;
        portfolioModel.deletePortfolio(portfolioId)
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

    function updatePortfolio(req, res) {
        var portfolioId = req.params.portfolioId;
        var newPortfolio = req.body;
        portfolioModel.updatePortfolio(portfolioId, newPortfolio)
            .then(
                function (doc) {
                    res.json(doc);
                },
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
};