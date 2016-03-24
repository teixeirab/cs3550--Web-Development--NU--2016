var portfolios = require("./data/portfolios.mock.json");
module.exports = function(uuid) {
    var api = {
        findAllPortfolios : findAllPortfolios,
        findPortfoliosForUser : findPortfoliosForUser,
        createPortfolio : createPortfolio,
        deletePortfolio : deletePortfolio,
        updatePortfolio : updatePortfolio
    };

    return api;

    function findAllPortfolios(){
        return portfolios;
    }

    function findPortfoliosForUser(userId){
        var userPortfolios = [];
        for (var f in portfolios) {
            if (portfolios[f].userId === parseInt(userId)) {
                userPortfolios.push(portfolios[f]);
            }
        }
        return userPortfolios;
    }

    function createPortfolio (portfolio){
        var newPortfolio = {
            _id: portfolio._id,
            game_id: portfolio.game_id,
            userId: portfolio.userId,
            companies: portfolio.companies,
            shares: portfolio.shares,
            cash_remaining: portfolio.cash_remaining,
            currentTurn: portfolio.currentTurn
        };
        portfolios.push(newPortfolio);
        return portfolios;
    }

    function deletePortfolio(portfolioId){
        for (var f in portfolios) {
            if (portfolios[f]._id === portfolioId) {
                portfolios.splice(f, 1);
            }
        }
        return portfolios;
    }

    function updatePortfolio (portfolioId, newPortfolio) {
        for (var f in portfolios) {
            if (portfolios[f]._id === portfolioId) {
                    portfolios[f] = newPortfolio;
            }
        }
        return portfolios;
    }

};