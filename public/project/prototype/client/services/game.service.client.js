(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .factory("GameService", GameService);

    function GameService($rootScope, $http) {
        var api = {
            createGame: createGame,
            updateGame: updateGame,
            deleteGame: deleteGame,
            findAllGames: findAllGames,
            findGamesForUser: findGamesForUser
        };
        return api;

        function findAllGames() {
            return $http.get("/api/project/game/");
        }

        function findGamesForUser() {
            return $http.get("/api/project/game/"+$rootScope.currentUser._id);
        }

        function createGame(game){
            return $http.post("/api/project/game", game);
        }

        function updateGame(gameId, game){
            return $http.put("/api/project/game/" + gameId, game);
        }

        function deleteGame(gameId){
            return $http.delete("/api/project/game/"+ gameId);
        }
    }
})();