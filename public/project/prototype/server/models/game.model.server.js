var games = require("./data/game.mock.json");
module.exports = function(uuid) {
    var api = {
        findAllGames : findAllGames,
        findGamesForUser : findGamesForUser,
        createGame : createGame,
        deleteGame : deleteGame,
        updateGame : updateGame
    };

    return api;

    function findAllGames(){
        return games;
    }

    function findGamesForUser(userId){
        var userGames = [];
        for (var f in games) {
            if (games[f].userId === parseInt(userId)) {
                userGames.push(games[f]);
            }
        }
        return userGames;
    }

    function createGame (game){
        var newGame = {
            _id: game._id,
            title: game.title,
            userId: game.userId,
            players: game.players,
            duration: game.duration,
            universe: game.universe,
            currentTurn: game.currentTurn
        };
        games.push(newGame);
        return games;
    }

    function deleteGame(gameId){
        for (var f in games) {
            if (games[f]._id === gameId) {
                games.splice(f, 1);
            }
        }
        return games;
    }

    function updateGame (gameId, newGame) {
        for (var f in games) {
            if (games[f]._id === gameId) {
                games[f] = newGame;
            }
        }
        return games;
    }

}
