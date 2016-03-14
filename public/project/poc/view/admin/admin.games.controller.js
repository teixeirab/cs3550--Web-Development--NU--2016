(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminGamesController", AdminGamesController);

    function AdminGamesController($scope, GameService, $location, $rootScope) {
        $scope.games = GameService.games;
        $scope.addGame = addGame;
        $scope.deleteGame = deleteGame;
        $scope.updateGame = updateGame;
        $scope.selectGame = selectGame;

        function init(){
            var callback = function (response){
                $scope.games = response;
            };
            GameService.findAllGames(callback)
        }

        init();

        function addGame(game){
            GameService.createGame(game, init);
        }

        function updateGame(game){
            GameService.updateGameById(game._id, game, init);
            $scope.game = null;
        }

        function deleteGame (game){
            GameService.deleteGameById(game._id, init);
        }

        function selectGame(index){
            $scope.game = $scope.games[index];
        }

    }
})();
