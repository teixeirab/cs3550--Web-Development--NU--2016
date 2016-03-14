(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .factory("GameService", GameService);

    function GameService($rootScope, UserService) {
        var model = {
            games: [
                {"_id": "000", "title": "game1", "userId": 234, "players": [123, 345, 456], "duration": 30, "universe": 10},
                {"_id": "001", "title": "game2", "userId": 234, "players": [123, 345] , "duration": 30, "universe": 10},
                {"_id": "002", "title": "game3", "userId": 234, "players": [123] , "duration": 30, "universe": 10}
            ],
            findAllGames : findAllGames,
            createGameForUser : createGameForUser,
            createGame : createGame,
            findAllGamesForUser : findAllGamesForUser,
            deleteGameById : deleteGameById,
            updateGameById : updateGameById
        };
        return model;

        function findAllGames(callback){
            callback(model.games);
        }

        function createGameForUser(userId, game){
            var player1 = UserService.findUserByName(game.player1);
            var player2 = UserService.findUserByName(game.player2);
            var player3 = UserService.findUserByName(game.player3);

            var newGame = {
                _id: (new Date).getTime(),
                title: game.title,
                userId: userId,
                players: [player1._id, player2._id, player3._id],
                duration : 10,
                universe: 20
            };
            model.games.push(newGame);
        }

        function createGame (game, callback){
            var now = new Date().getTime();
            var id = "id-"+now;

            var newGame = {
                _id: id,
                title: game.title,
                userId: game.userId,
                players: game.players,
                duration: game.duration,
                universe: game.universe
            };

            model.games.push(newGame);
            callback(newGame);
        }

        function findAllGamesForUser(userId, callback){
            var userForms = [];
            for (var f in model.games) {
                if (model.games[f].userId === userId) {
                    userForms.push(model.games[f]);
                }
                callback(userForms);
            }
        }

        function deleteGameById(gameId, callback){
            for (var f in model.games) {
                if (model.games[f]._id === gameId) {
                    model.games.splice(f, 1);
                }
                callback(model.games);
            }
        }

        function updateGameById (gameId, newGame, callback) {
            var forms = model.games;
            for (var f in forms) {
                if (forms[f]._id === gameId) {
                    forms[f] = newGame;
                    callback(model.games);
                }
            }
        }
    }
})();