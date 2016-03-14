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

        function renderPortfolio(){
            var callback = function (response){
                $scope.portfolios = response;
            };
        }

        renderPortfolio();

        function addPortfolio(portfolio){
            var setPortfolio = function(response){
                InvestingService.setCurrentUser(response);
            };

            InvestingService.createGameForUser();
        }

        function updatePortfolio(portfolio){
            InvestingService.updateGame();
        }

        function deletePortfolio(portfolio){
            GameService.deleteUserById();
        }

        function selectPortfolio(index){
            $scope.game = $scope.games[index];
        }

    }
})();
