(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("GameRegistrationController", GameRegistrationController);

    function GameRegistrationController(PortfolioService, GameService,  $routeParams, $rootScope, $location) {
        var vm = this;
        vm.games = [];
        var gameId = $routeParams.gameId;
        vm.joinGame = joinGame;
        vm.currentUser = $rootScope.currentUser;

        function init() {
            $rootScope.$broadcast('game-out');
            GameService
                .findAllOpenGames()
                .then(function (response){
                    if(response.data) {
                        vm.games = response.data
                    }
                })
        }
        init();

        function joinGame(index) {
            var newPortfolio = {
                username: vm.currentUser.username,
                gameName : vm.games[index].title,
                holdings : [],
                cash_remaining : 1000,
                currentTurn : 5
            };

            GameService
                .addUserInGame(vm.currentUser.username, vm.games[index].title)
                .then(function (response) {
                    if (response.data) {
                        createPortfolio(newPortfolio)
                    }
                });
        }


        function createPortfolio(newPortfolio){
            PortfolioService
                .createPortfolio(newPortfolio)
                .then(function (response) {
                    if (response.data) {
                        $location.url("/profile/" + newPortfolio.username);
                    }
                });
        }

    }
})();