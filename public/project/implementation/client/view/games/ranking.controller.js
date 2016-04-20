(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("RankingController", RankingController);

    function RankingController(PortfolioService, GameService, $routeParams, $rootScope, $location) {
        var vm = this;
        vm.portfolios = [];
        vm.ranking = [];
        var username = $routeParams.username;
        vm.currentUser = $rootScope.currentUser;
        vm.gameName = $routeParams.gameTitle;
        vm.leaveGame = leaveGame;

        function init() {
            $rootScope.$broadcast('new-game', vm.gameName);
            PortfolioService
                .findPortfolioForUser(username, vm.gameName)
                .then(function (response){
                    if(response.data) {
                        vm.gameName = response.data.gameName;
                        findPortfolios();
                        findGame();
                    }
                });
            PortfolioService
                .findPortfolioForUser(username, vm.gameName)
                .then(function(response){
                    if(response.data) {
                        vm.currentPortfolio = response.data;
                        if(vm.currentPortfolio.status === 'over'){
                            $rootScope.$broadcast('game-over')
                        }
                    }
                });
        }
        init();

        function leaveGame(){
            PortfolioService
                .deletePortfolio(vm.currentPortfolio._id)
                .then(function (response){
                    if(response.data) {
                        console.log(response.data);
                        GameService
                            .deleteUserFromGame(vm.gameName, vm.currentUser.username)
                            .then(function (){
                                $location.url("/game/registration");
                                $rootScope.$broadcast('game-out');
                            })
                    }
            })
        }

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
                        checkEndGame();
                        buildRankTable();
                    }
                })
        }

        function checkEndGame(){
            var result = true;
            for (var i = 0; i < vm.portfolios.length; i++){
                if (vm.portfolios[i].status != 'over'){
                    result = false
                }
            }
            if (result === true){
                GameService
                    .updateStatus(vm.gameName, "over")
                    .then(function (response){
                        if(response.data) {
                            vm.game = response.data;
                        }
                    })
            }
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

    }

})();