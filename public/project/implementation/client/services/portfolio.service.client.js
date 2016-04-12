(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .factory("PortfolioService", PortfolioService);

    function PortfolioService($http, $rootScope) {
        var api = {
            createPortfolio: createPortfolio,
            updatePortfolio: updatePortfolio,
            deletePortfolio: deletePortfolio,
            findAllPortfolios: findAllPortfolios,
            findPortfoliosInGame: findPortfoliosInGame,
            findPortfolioForUser: findPortfolioForUser,
            findAllPortfoliosByText : findAllPortfoliosByText,
            tradeCompanyForUser : tradeCompanyForUser,
            advanceTurnForPortfolio : advanceTurnForPortfolio,
            updateReturn : updateReturn
        };
        return api;

        function findPortfoliosInGame(gameId) {
            return $http.get("/api/project/portfolio/game/" + gameId);
        }

        function updateReturn(portfolioId, turn, turnReturn){
            return $http.post("/api/project/portfolio/return/" + portfolioId + "/" + turn + "/" + turnReturn);
        }

        function advanceTurnForPortfolio(portfolioId, currentTurn){
            return $http.post("/api/project/portfolio/advance/" + portfolioId + "/" + currentTurn);
        }

        function tradeCompanyForUser(portfolioTrade){
            return $http.post("/api/project/portfolio/trade/" + $rootScope.currentUser.username, portfolioTrade);
        }

        function findAllPortfoliosByText(text){
            return $http.get("/api/project/portfolio/all/" + text);
        }

        function findAllPortfolios() {
            return $http.get("/api/project/portfolio/");
        }

        function findPortfolioForUser(username) {
            return $http.get("/api/project/portfolio/"+ username);
        }
        
        function createPortfolio(portfolio){
            return $http.post("/api/project/portfolio", portfolio);
        }

        function updatePortfolio(portfolioId, portfolio){
            return $http.put("/api/project/portfolio/" + portfolioId, portfolio);
        }

        function deletePortfolio(portfolioId){
            return $http.delete("/api/project/portfolio/"+ portfolioId);
        }

    }


})();

