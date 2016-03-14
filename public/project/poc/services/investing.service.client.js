(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .factory("InvestingService", InvestingService);

    function InvestingService() {
        var model = {
            portfolios: [
                {"_id": "000", "game_id": "game1", "userId": 134, "companies": [1, 2, 3], "shares": [10, 5, 2], "cash_remaining": 500},
                {"_id": "001", "game_id": "game1", "userId": 345, "companies": [4, 5, 6], "shares": [12, 2, 2], "cash_remaining": 0},
                {"_id": "002", "game_id": "game1", "userId": 456, "companies": [1, 5, 4], "shares": [11, 3, 1], "cash_remaining": 100}
            ],
            companies: [
                {"_id": 1, "name": "ABC", "price": 12, "market_cap": 500000},
                {"_id": 2, "name": "CBD", "price": 15, "market_cap": 1000000},
                {"_id": 3, "name": "EFG", "price": 19, "market_cap": 1200000},
                {"_id": 4, "name": "GAB", "price": 23, "market_cap": 41200000},
                {"_id": 5, "name": "ZP", "price": 11, "market_cap": 124100000},
                {"_id": 6, "name": "AP", "price": 12, "market_cap": 14500000}
            ],
            createCompany : createCompany,
            deleteCompanyById : deleteCompanyById,
            findCompanyById : findCompanyById,
            updateCompanyById: updateCompanyById,
            createPortfolio : createPortfolio,
            deletePortfolioById : deletePortfolioById,
            findPortfolioById : findPortfolioById,
            updatePortfolioById: updatePortfolioById,
            findAllCompanies : findAllCompanies,
            findAllPortfolios : findAllPortfolios
        };
        return model;

        function findAllCompanies(callback){
            callback(model.companies);
        }

        function findAllPortfolios(callback){
            callback(model.portfolios);
        }

        function createPortfolio(portfolio, callback){
            var newPortfolio = {
                _id: (new Date).getTime(),
                game_id: portfolio.game_id,
                userId: portfolio.userId,
                companies: portfolio.companies,
                shares: portfolio.shares,
                cash_remaining: portfolio.cash_remaining
            };
            model.portfolios.push(newPortfolio);
            callback(newPortfolio);
        }

        function deletePortfolioById (portfolioId, callback){
            var portfolios = model.portfolios;
            for (var u in portfolios) {
                if (portfolios[u]._id === portfolioId) {
                    portfolios.splice(u, 1);
                    callback(model.portfolios);
                }
            }
        }

        function findPortfolioById(portfolioId){
            for (var u in model.portfolios) {
                if (model.portfolios[u]._id === portfolioId) {
                    return model.portfolios[u];
                }
            }
            return null;
        }

        function updatePortfolioById (portfolioId, portfolio, callback) {
            var portfolioOld = findPortfolioById(portfolioId);
            if (portfolio != null) {
                portfolioOld.game_id = portfolio.game_id;
                portfolioOld.userId = portfolio.userId;
                portfolioOld.companies = portfolio.companies;
                portfolioOld.shares = portfolio.shares;
                portfolioOld.cash_remaining = portfolio.cash_remaining;
                callback(portfolio);
            } else {
                callback(null);
            }
        }

        function createCompany(company, callback){
            var newCompany = {
                _id: (new Date).getTime(),
                name: company.name,
                price: company.price,
                market_cap: company.market_cap
            };
            model.companies.push(newCompany);
            callback(newCompany);
        }

        function deleteCompanyById (companyId, callback){
            var companies = model.companies;
            for (var u in companies) {
                if (companies[u]._id === companyId) {
                    companies.splice(u, 1);
                    callback(model.companies);
                }
            }
        }

        function findCompanyById(companyId){
            for (var u in model.companies) {
                if (model.companies[u]._id === companyId) {
                    return model.companies[u];
                }
            }
            return null;
        }

        function updateCompanyById (companyId, company, callback) {
            var companyOld = findCompanyById(companyId);
            if (company != null) {
                companyOld.name = company.name;
                companyOld.price = company.price;
                companyOld.market_cap = company.market_cap;
                callback(company);
            } else {
                callback(null);
            }
        }
    }
})();
