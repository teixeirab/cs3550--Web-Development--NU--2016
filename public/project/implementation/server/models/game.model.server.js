var q = require("q");
var games = require("./data/game.mock.json");
module.exports = function(uuid, db, mongoose) {

    // load user schema
    var GameSchema = require("./schemas/game.schema.server.js")(mongoose);

    // create user model from schema
    var GameModel = mongoose.model('Game', GameSchema);

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
        var deferred = q.defer();
        GameModel.find('Game', function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
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
            title: game.title,
            userId: game.userId,
            players: game.players,
            duration: game.duration,
            universe: game.universe,
            currentTurn: game.currentTurn
        };

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        GameModel.create(newGame, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function deleteGame(gameId){
        var deferred = q.defer();
        GameModel.findByIdAndRemove(gameId, function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function updateGame (gameId, newGame) {

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        GameModel.findByIdAndUpdate(gameId, newGame, {new: true}, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

}
