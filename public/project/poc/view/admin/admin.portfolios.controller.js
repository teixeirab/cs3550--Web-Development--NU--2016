(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminPortfoliosController", AdminPortfoliosController);

    function AdminPortfoliosController($scope, InvestingService, $location, $rootScope) {
        $scope.portfolios = InvestingService.portfolios;
        $scope.addPortfolio = addPortfolio;
        $scope.deletePortfolio = deletePortfolio;
        $scope.updatePortfolio = updatePortfolio;
        $scope.selectPortfolio = selectPortfolio;

        function init(){
            var callback = function (response){
                $scope.portfolios = response;
            };
            InvestingService.findAllPortfolios(callback)
        }

        init();

        function addPortfolio(portfolio){
            InvestingService.createPortfolio(portfolio, init);
        }

        function updatePortfolio(portfolio){
            InvestingService.updatePortfolioById(portfolio._id, portfolio, init);
            $scope.portfolio = null;
        }

        function deletePortfolio (portfolio, callback){
            InvestingService.deletePortfolioById(portfolio._id, init);
        }

        function selectPortfolio(index){
            $scope.portfolio = $scope.portfolios[index];
        }

    }
})();
