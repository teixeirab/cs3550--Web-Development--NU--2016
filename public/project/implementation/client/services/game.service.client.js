(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .factory("GameService", GameService);

    function GameService($rootScope, $http) {
        var api = {
            addUserInGame : addUserInGame,
            createGame: createGame,
            updateGame: updateGame,
            deleteGame: deleteGame,
            findAllGames: findAllGames,
            findGamesForUser: findGamesForUser,
            findAllGamesByText : findAllGamesByText
        };

        return api;

        function addUserInGame(username, gameName){
            return $http.get("/api/project/game/add/"+username+"/"+ gameName);
        }

        function findAllGames() {
            return $http.get("/api/project/game/");
        }

        function findAllGamesByText(text){
            return $http.get("/api/project/game/search/"+text);
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