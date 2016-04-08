(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminGamesController", AdminGamesController);

    function AdminGamesController(GameService, $routeParams, cssInjector) {
        var vm = this;
        vm.games = [];
        var gameId = $routeParams.gameId;
        vm.deleteGame = deleteGame;
        vm.updateGame = updateGame;
        vm.selectGame = selectGame;
        vm.addGame = addGame;

        function init() {
            GameService
                .findAllGames()
                .then(function (response){
                    if(response.data) {
                        vm.games = response.data
                    }
                })
        }
        init();

        function deleteGame(game){
            GameService
                .deleteGame(game._id)
                .then(function(response){
                    if(response.data) {
                        init()
                    }
                });
        }

        function updateGame(Game){
            GameService
                .updateGame(Game._id, Game)
                .then(function(response){
                    if(response.data) {
                        init()
                    }
                });
        }

        function selectGame(index){
            vm.game = vm.games[index];
        }

        function addGame(game){
            GameService
                .createGame(game)
                .then(function(response){
                    if(response.data) {
                        init()
                    }
                });
        }
    }
})();

