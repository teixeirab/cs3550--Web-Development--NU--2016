(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .factory("InvestingService", InvestingService);

    function InvestingService($rootScope, UserService, GameService) {
        var model = {
            portfolios: [
                {"_id": "000", "game_id": "game1", "userId": 134, "companies": [1, 2, 3], "shares": [10, 5, 2], "cash_remaining": 500},
                {"_id": "001", "game_id": "game1", "userId": 345, "companies": [4, 5, 6], "shares": [12, 2, 2], "cash_remaining": 0},
                {"_id": "002", "game_id": "game1", "userId": 456, "companies": [1, 5, 4], "shares": [11, 3, 1], "cash_remaining": 100}
            ],
            companies: [
                {"_id": 1, "name": "ABC", "price": 12, "market_cap": 500000},
                {"_id": 2, "name": "CBD", "price": 15, "market_cap": 1000000},
                {"_id": 3, "name": "EFG", "price": 19, "market_cap": 1200000},
                {"_id": 4, "name": "GAB", "price": 23, "market_cap": 41200000},
                {"_id": 5, "name": "ZP", "price": 11, "market_cap": 124100000},
                {"_id": 6, "name": "AP", "price": 12, "market_cap": 14500000}
            ],
            createGameForUser : createGameForUser,
            findAllGamesForUser : findAllGamesForUser,
            deleteGameById : deleteGameById,
            updateGameById : updateGameById
        };
        return model;

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
