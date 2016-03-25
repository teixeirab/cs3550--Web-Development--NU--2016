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
            findPortfolioForUser: findPortfolioForUser,
        };
        return api;

        function findAllPortfolios() {
            return $http.get("/api/project/portfolio/");
        }

        function findPortfolioForUser() {
            return $http.get("/api/project/portfolio/"+$rootScope.currentUser._id);
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

