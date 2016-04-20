var q = require("q");
module.exports = function(db, mongoose) {
    // load user schema
    var PortfolioSchema = require("./schemas/portfolio.schema.server.js")(mongoose);

    // create user model from schema
    var PortfolioModel = mongoose.model('Portfolio', PortfolioSchema);

    var api = {
        findAllPortfolios : findAllPortfolios,
        findPortfoliosInGame : findPortfoliosInGame,
        findPortfoliosInGames : findPortfoliosInGames,
        createPortfolio : createPortfolio,
        deletePortfolio : deletePortfolio,
        updatePortfolio : updatePortfolio,
        findAllPortfoliosByText: findAllPortfoliosByText,
        findPortfoliosForUser : findPortfoliosForUser,
        tradeCompanyForUser : tradeCompanyForUser,
        getPortfolioByUsername : getPortfolioByUsername,
        advanceTurnForGame : advanceTurnForGame,
        updateReturn : updateReturn,
        endGameForUser : endGameForUser,
        resetStatusForGame : resetStatusForGame,
        setStatusForPortfolio : setStatusForPortfolio,
        findPortfolioById : findPortfolioById
    };
    return api;

    function findPortfolioById(portfolioId){
        var deferred = q.defer();
        PortfolioModel.findOne({_id : portfolioId}, function (err, doc){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findPortfoliosInGame(gameName){
        var deferred = q.defer();
        PortfolioModel.find({gameName : gameName}, function (err, doc){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function setStatusForPortfolio(portfolioId, status){
        var deferred = q.defer();
        PortfolioModel.findByIdAndUpdate(portfolioId, {$set: {status : status}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

    function advanceTurnForGame(portfolioId, currentTurn){
        var deferred = q.defer();
        var nextTurn = parseInt(currentTurn) + 1;
        PortfolioModel.findByIdAndUpdate(portfolioId, {$set: {currentTurn : nextTurn}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

    function resetStatusForGame(gameName){
        var deferred = q.defer();
        PortfolioModel.update({gameName: gameName},
            {$set: {"status": "passable"}}, { multi: true },  function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc)
                }
            });
        // return a promise
        return deferred.promise;
    }

    function endGameForUser(portfolioId){
        var deferred = q.defer();
        PortfolioModel.update({_id: portfolioId},
            {$set: {"status": "over"}}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc)
                }
            });
        // return a promise
        return deferred.promise;
    }

    function findPortfoliosInGames(games){
        var deferred = q.defer();
        PortfolioModel.find({
            gameName : {$in: games} }, function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function updateReturn(portfolioId, currentTurn, turnReturn){
        var deferred = q.defer();
        PortfolioModel.update({_id: portfolioId},
            {$push: {"portfolio_return": turnReturn, $position: currentTurn}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc)
            }
        });
        // return a promise
        return deferred.promise;
    }

    function getPortfolioByUsername (username){
        var deferred = q.defer();
        PortfolioModel.find({username: username}, function (err, doc){

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // assigns doc to portfolio
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

    function tradeCompanyForUser (username, portfolioTrade){
        var deferred = q.defer();
        var portfolio = portfolioTrade.portfolio;
        var trade = portfolioTrade.selectedCompany;
        var cashRemaining = portfolio.cash_remaining;

        // checks the transaction type
        if (trade.tradeType === "Buy") {
            // use q to defer the response
            // see if the whether the company is already in the portfolio
            if (isCompanyInPortfolio(trade.name, portfolio.holdings)) {
                for (var i = 0; i < portfolio.holdings.length; i++) {
                    if (portfolio.holdings[i].company_name === trade.name){
                        var updatedHolding = {
                            company_name: trade.name,
                            shares: trade.shares + portfolio.holdings[i].shares,
                            price: trade.currentPrice,
                            price_paid: trade.currentPrice,
                            return: portfolio.holdings[i].return,
                            total_value: trade.shares * trade.currentPrice + portfolio.holdings[i].total_value,
                            weight: portfolio.holdings[i].weight,
                            prices: trade.prices,
                            identifier: trade.identifier
                        };
                        portfolio.holdings.splice(i,1);
                        portfolio.holdings.push(updatedHolding);
                    }
                }
                cashRemaining = cashRemaining - trade.shares * trade.currentPrice
            }
            else {
                portfolio.holdings.push(
                    {
                        company_name: trade.name,
                        shares: trade.shares,
                        price: trade.currentPrice,
                        price_paid: trade.currentPrice,
                        return: 0,
                        total_value: trade.shares * trade.currentPrice,
                        weight: 0,
                        prices: trade.prices,
                        identifier: trade.identifier
                    }
                );
                cashRemaining = cashRemaining - trade.shares * trade.currentPrice
            }
        }

        if (trade.tradeType === "Sell") {
            // use q to defer the response
            // see if the whether the company is already in the portfolio
            if (isCompanyInPortfolio(trade.name, portfolio.holdings)) {
                for (var i = 0; i < portfolio.holdings.length; i++) {
                    if (portfolio.holdings[i].company_name === trade.name){
                        if(portfolio.holdings[i].shares > trade.shares){
                            var updatedHolding = {
                                company_name: trade.name,
                                shares: portfolio.holdings[i].shares - trade.shares,
                                price: trade.currentPrice,
                                price_paid: trade.currentPrice,
                                return: portfolio.holdings[i].return,
                                total_value: portfolio.holdings[i].total_value - (trade.shares * trade.currentPrice),
                                weight: portfolio.holdings[i].weight,
                                prices: trade.prices,
                                identifier: trade.identifier
                            };
                            portfolio.holdings.splice(i,1);
                            portfolio.holdings.push(updatedHolding);
                        }
                        else {
                            portfolio.holdings.splice(i,1);
                        }

                    }
                }
                cashRemaining = cashRemaining + trade.shares * trade.currentPrice
            }
            else {
                console.log("company not in portfolio")
            }
        }

        var newPortfolio = {
            gameName: portfolio.gameName,
            username: portfolio.username,
            holdings : portfolio.holdings,
            cash_remaining: cashRemaining,
            currentTurn: portfolio.currentTurn,
            portfolio_return : portfolio.portfolio_return,
            status : portfolio.status
        };

        PortfolioModel.findByIdAndUpdate(portfolio._id, newPortfolio, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

    function isCompanyInPortfolio(companyName, holdings){
        var result = false;
        for (var i = 0; i < holdings.length; i++) {
            if(holdings[i].company_name === companyName){
                result = true;
            }
        }
        return result;
    }

    function findPortfoliosForUser(username, gameName){
        var deferred = q.defer();
        PortfolioModel.find({username : username, gameName: gameName}, function (err, doc){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc[0]);
                }
            }
        );
        return deferred.promise;
    }


    function findAllPortfoliosByText(text){
        var deferred = q.defer();
        PortfolioModel.find({ $or: [{gameName: text}, {username: text}, {status: text}]},
            function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findAllPortfolios(){
        var deferred = q.defer();
        PortfolioModel.find('portfolio', function (err, doc){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function createPortfolio (portfolio){
        var newPortfolio = {
            gameName: portfolio.gameName,
            username: portfolio.username,
            companies: portfolio.companies,
            shares: portfolio.shares,
            cash_remaining: portfolio.cash_remaining,
            currentTurn: portfolio.currentTurn,
            status: "passable"
        };

        var deferred = q.defer();
        PortfolioModel.create(newPortfolio, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

    function deletePortfolio(portfolioId){
        var deferred = q.defer();
        PortfolioModel.findByIdAndRemove(portfolioId, function (err, doc){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function updatePortfolio (portfolioId, newPortfolio) {
        var deferred = q.defer();
        PortfolioModel.findByIdAndUpdate(portfolioId, newPortfolio, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}