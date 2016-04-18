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
            updateReturn : updateReturn,
            endGameForUser : endGameForUser,
            findPortfoliosInGames: findPortfoliosInGames,
            resetStatusForGame: resetStatusForGame
        };
        return api;

        function resetStatusForGame(gameName){
            return $http.post("/api/project/portfolio/update/status", gameName);
        }

        function findPortfoliosInGames(games){
            return $http.post("/api/project/portfolio/find", games);
        }

        function endGameForUser(portfolioId){
            return $http.post("/api/project/portfolio/end/" + portfolioId);
        }

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

