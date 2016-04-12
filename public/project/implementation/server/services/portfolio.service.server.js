module.exports = function(app, userModel, gameModel, companyModel, portfolioModel) {
    app.get("/api/project/portfolio", findAllPortfolio);
    app.get("/api/project/portfolio/:username", findPortfolioForUser);
    app.post("/api/project/portfolio", createPortfolio);
    app.delete("/api/project/portfolio/:portfolioId", deletePortfolio);
    app.put("/api/project/portfolio/:portfolioId", updatePortfolio);
    app.get("/api/project/portfolio/all/:text", findAllPortfoliosByText);
    app.post("/api/project/portfolio/trade/:username", tradeCompanyForUser);
    app.post("/api/project/portfolio/advance/:portfolioId/:turn", advanceTurnForGame);
    app.post("/api/project/portfolio/return/:portfolioId/:turn/:turnReturn", updateReturn);
    app.get("/api/project/portfolio/game/:gameId", findPortfoliosInGame);

    function findPortfoliosInGame(req, res) {
        var gameId = req.params.gameId;
        portfolioModel.findPortfoliosInGame(gameId)
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
                // send error if promise rejected
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
        portfolioModel.findPortfoliosForUser(username)
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
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
};