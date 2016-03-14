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

        function renderGame(){
            var callback = function (response){
                $scope.games = response;
            };
        }

        renderGame();

        function addGame(user){
            var setGame = function(response){
                GameService.setCurrentUser(response);
            };

            GameService.createGameForUser();
        }

        function updateGame(game){
            GameService.updateGame();
        }

        function deleteGame(game){
            GameService.deleteUserById();
        }

        function selectGame(index){
            $scope.game = $scope.games[index];
        }

    }
})();
