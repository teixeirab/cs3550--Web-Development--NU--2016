var portfolios = require("./data/portfolios.mock.json");
var q = require("q");
module.exports = function(uuid, db, mongoose) {
    // load user schema
    var PortfolioSchema = require("./schemas/portfolio.schema.server.js")(mongoose);

    // create user model from schema
    var PortfolioModel = mongoose.model('Portfolio', PortfolioSchema);

    var api = {
        findAllPortfolios : findAllPortfolios,
        createPortfolio : createPortfolio,
        deletePortfolio : deletePortfolio,
        updatePortfolio : updatePortfolio,
        findAllPortfoliosByText: findAllPortfoliosByText
    };
    return api;

    function findAllPortfoliosByText(text){
        console.log(text)
        var temp = [];
        for (var f in portfolios) {
            if (portfolios[f].userId === text ||
                portfolios[f].game_id === text) {
                temp.push(portfolios[f]);
            }
        }
        return temp;
    }

    function findAllPortfolios(){
        var deferred = q.defer();
        PortfolioModel.find('portfolio', function (err, doc){
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

    function createPortfolio (portfolio){
        var newPortfolio = {
            gameName: portfolio.gameName,
            username: portfolio.username,
            companies: portfolio.companies,
            shares: portfolio.shares,
            cash_remaining: portfolio.cash_remaining,
            currentTurn: portfolio.currentTurn
        };

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        PortfolioModel.create(newPortfolio, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function deletePortfolio(portfolioId){
        var deferred = q.defer();
        PortfolioModel.findByIdAndRemove(portfolioId, function (err, doc){
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

    function updatePortfolio (portfolioId, newPortfolio) {

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        PortfolioModel.findByIdAndUpdate(portfolioId, newPortfolio, {new: true}, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

};