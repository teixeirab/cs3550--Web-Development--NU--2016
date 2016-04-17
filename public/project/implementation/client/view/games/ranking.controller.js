(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("RankingController", RankingController);

    function RankingController(PortfolioService, GameService, $routeParams, $rootScope, $scope) {
        var vm = this;
        vm.portfolios = [];
        vm.ranking = [];
        var username = $routeParams.username;

        function init() {
            PortfolioService
                .findPortfolioForUser(username)
                .then(function (response){
                    if(response.data) {
                        vm.gameName = response.data.gameName;
                        findPortfolios();
                        findGame();
                    }
                });
        }
        init();

        function findGame(){
            GameService
                .findGamesByName(vm.gameName)
                .then(function (response){
                    if(response.data) {
                        vm.game = response.data;
                    }
                })
        }

        function findPortfolios(){
            PortfolioService
                .findPortfoliosInGame(vm.gameName)
                .then(function (response){
                    if(response.data) {
                        vm.portfolios = response.data;
                        buildRankTable();
                    }
                })
        }

        function findTotalReturn(returns){
            var result = 1;
            for (var i =0; i < returns.length; i++){
                result = result * (1+ (returns[i] / 100))
            }
            result = result - 1;
        }

        function findRelativeReturn(returns){
            var result = 1;
            for (var i =0; i < returns.length; i++){
                result = result * (1+ (returns[i] / 100))
            }
            return result = result - 1;
        }

        function buildRankTable(){
            for (var i =0; i < vm.portfolios.length; i++){
                var relativeReturn = findRelativeReturn(vm.portfolios[i].portfolio_return);
                var totalReturn = findTotalReturn(vm.portfolios[i].portfolio_return);
                var rank = {
                    rank : 1,
                    username: vm.portfolios[i].username,
                    cashRemaining: vm.portfolios[i].cash_remaining,
                    totalReturn: relativeReturn,
                    relativeReturn: relativeReturn,
                    sharpeRatio: (relativeReturn - 0.05) / 15,
                    status : vm.portfolios[i].status

            };
                vm.ranking.push(rank)
            }
        }

        function buildTable(){
            vm.summaryTable = [];
            vm.totalEquity = [];
            for (var i = 0; i < vm.currentPortfolio.holdings.length; i++){
                vm.totalEquity = Math.round(vm.totalEquity + vm.currentPortfolio.holdings[i].shares *
                    vm.currentPortfolio.holdings[i].prices[vm.currentPortfolio.currentTurn]);
                var company = {
                    name: vm.currentPortfolio.holdings[i].company_name,
                    shares: vm.currentPortfolio.holdings[i].shares,
                    prices: vm.currentPortfolio.holdings[i].prices,
                    price_paid: vm.currentPortfolio.holdings[i].price_paid,
                    return: Math.round(((vm.currentPortfolio.holdings[i].prices[vm.currentPortfolio.currentTurn] /
                        vm.currentPortfolio.holdings[i].price_paid) - 1)*100),
                    total_value: vm.currentPortfolio.holdings[i].shares *
                    vm.currentPortfolio.holdings[i].prices[vm.currentPortfolio.currentTurn]
                };
                vm.summaryTable.push(company)
            }
        }
    }

})();