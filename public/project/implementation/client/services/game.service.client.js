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
            findAllCompaniesForGame: findAllCompaniesForGame,
            findGamesForUser: findGamesForUser,
            findAllGamesByText : findAllGamesByText,
            endGame : endGame,
            findGamesByName: findGamesByName,
            findAllOpenGames: findAllOpenGames,
            updateStatus : updateStatus,
            deleteUserFromGame: deleteUserFromGame,
            findGameUserIsIn: findGameUserIsIn,
            setCurrentGame : setCurrentGame
        };
        return api;

        function setCurrentGame(game) {
            $rootScope.currentGame = game;
        }

        function findGameUserIsIn(username){
            return $http.get("/api/project/game/find/users/" + username);
        }

        function updateStatus(gameName, status){
            return $http.get("/api/project/game/update/" + gameName + '/' + status);
        }

        function deleteUserFromGame(gameName, username){
            return $http.get("/api/project/game/delete/" + gameName + '/' + username);
        }

        function findAllOpenGames(){
            return $http.get("/api/project/game/find/open");
        }

        function findGamesByName(gameName){
            return $http.get("/api/project/game/name/"+ gameName);
        }

        function endGame(game){
            return $http.post("/api/project/game/end", game);
        }

        function findAllCompaniesForGame(gameId){
            return $http.get("/api/project/game/companies/" + gameId);
        }

        function addUserInGame(username, gameName){
            return $http.get("/api/project/game/add/"+username+"/"+ gameName);
        }

        function findAllGames() {
            return $http.get("/api/project/game/");
        }

        function findAllGamesByText(text){
            return $http.get("/api/project/game/search/"+text);
        }

        function findGamesForUser(username) {
            return $http.get("/api/project/game/"+ username);
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