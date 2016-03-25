var games = require("./data/game.mock.json");
module.exports = function(uuid) {
    var api = {
        findAllGames : findAllGames,
        findGamesForUser : findGamesForUser,
        createGame : createGame,
        deleteGame : deleteGame,
        updateGame : updateGame,
        findAllGamesByText: findAllGamesByText
    };

    return api;

    function findAllGamesByText(text){
        var temp = [];
        for (var f in games) {
            if (games[f].title === text) {
                temp.push(games[f]);
            }
        }
        return temp;
    }

    function findAllGames(){
        return games;
    }

    function findGamesForUser(userId){
        var userGames = [];
        for (var f in games) {
            if (games[f].userId === userId) {
                userGames.push(games[f]);
            }
        }
        return userGames;
    }

    function createGame (game){
        var newGame = {
            _id: uuid.v4(),
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
