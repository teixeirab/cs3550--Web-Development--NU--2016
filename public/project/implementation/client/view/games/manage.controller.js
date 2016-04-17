(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("ManageController", ManageController);


    function ManageController(PortfolioService, GameService, $routeParams, $rootScope, $uibModal) {
        var vm = this;
        vm.portfolios = [];
        vm.games = [];
        vm.createNewGame = createNewGame;
        vm.editGame = editGame;
        vm.editPortfolio = editPortfolio;

        function init() {
            GameService
                .findGamesForUser($rootScope.currentUser.username)
                .then(function (response){
                    if(response.data) {
                        vm.games = response.data;
                        var gameNames = listOfGameNames(vm.games);
                        findPortfoliosInGames(gameNames);
                    }
                })
        }
        init();

        function createNewGame(){
            $rootScope.modalInstance = $uibModal.open({
                templateUrl: 'view/games/create.popup.view.html',
                controller: 'CreatePopupController',
                controllerAs: "model",
                size: 'sm',
                resolve: {
                    username  : function () {
                        return  $rootScope.currentUser.username
                    }
                }
            });
        }

        function editGame(index){
            vm.game = vm.games[index];
            $rootScope.modalInstance = $uibModal.open({
                templateUrl: 'view/games/edit.game.popup.view.html',
                controller: 'EditGamePopupController',
                controllerAs: "model",
                size: 'md',
                resolve: {
                    game  : function () {
                        return  vm.game
                    },
                    username  : function () {
                        return  $rootScope.currentUser.username
                    }
                }
            });
        }

        function editPortfolio(index){
            vm.portfolio = vm.portfolios[index];
            $rootScope.modalInstance = $uibModal.open({
                templateUrl: 'view/games/edit.portfolio.popup.view.html',
                controller: 'EditPortfolioPopupController',
                controllerAs: "model",
                size: 'md',
                resolve: {
                    portfolio  : function () {
                        return  vm.portfolio
                    }
                }
            });
        }

        function listOfGameNames(games){
            var temp = [];
            for (var i = 0; i < games.length; i++){
                temp.push(games[i].title)
            }
            return temp;
        }

        function findPortfoliosInGames(games){
            PortfolioService
                .findPortfoliosInGames(games)
                .then(function (response){
                    if(response.data) {
                        vm.portfolios = response.data;
                    }
                })
        }
    }
})();