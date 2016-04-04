module.exports = function(app, userModel, gameModel, companyModel, portfolioModel) {
    app.get("/api/project/portfolio", findAllPortfolio);
    app.get("/api/project/portfolio/:userId", findPortfolioForUser);
    app.post("/api/project/portfolio", createPortfolio);
    app.delete("/api/project/portfolio/:portfolioId", deletePortfolio);
    app.put("/api/project/portfolio/:portfolioId", updatePortfolio);
    app.get("/api/project/portfolio/all/:text", findAllPortfoliosByText);

    function findAllPortfoliosByText(req, res){
        var text = req.params.text;
        var portfolios = portfolioModel.findAllPortfoliosByText(text)
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
        var portfolios = portfolioModel.findAllPortfolios()
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
        var user = req.params.userId;
        var portfolio = portfolioModel.findPortfoliosForUser(user)
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
        var portfolios = portfolioModel.createPortfolio(user)
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
        var portfolios = portfolioModel.deletePortfolio(portfolioId)
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
        var portfolios = portfolioModel.updatePortfolio(portfolioId, newPortfolio)
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