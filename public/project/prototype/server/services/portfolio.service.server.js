module.exports = function(app, userModel, gameModel, companyModel, portfolioModel) {
    app.get("/api/project/portfolio", findAllPortfolio);
    app.get("/api/project/portfolio/:userId", findPortfolioForUser);
    app.post("/api/project/portfolio", createPortfolio);
    app.delete("/api/project/portfolio/:portfolioId", deletePortfolio);
    app.put("/api/project/portfolio/:portfolioId", updatePortfolio);

    function findAllPortfolio(req, res) {
        var portfolios = portfolioModel.findAllPortfolios();
        res.json(portfolios);
    }

    function findPortfolioForUser(req, res) {
        var user = req.params.userId;
        var portfolio = portfolioModel.findPortfoliosForUser(user);
        res.json(portfolio);
    }

    function createPortfolio(req, res) {
        var user = req.body;
        var portfolios = portfolioModel.createPortfolio(user);
        res.json(portfolios);
    }

    function deletePortfolio(req, res) {
        var portfolioId = req.params.portfolioId;
        var portfolios = portfolioModel.deletePortfolio(portfolioId);
        res.json(portfolios);
    }

    function updatePortfolio(req, res) {
        var portfolioId = req.params.portfolioId;
        var newPortfolio = req.body;
        var portfolios = portfolioModel.updatePortfolio(portfolioId, newPortfolio);
        res.json(portfolios);
    }
};