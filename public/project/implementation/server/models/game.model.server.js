var q = require("q");
var generateName = require('sillyname');
module.exports = function(uuid, db, mongoose, companyModel) {

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
        findAllGamesByText: findAllGamesByText,
        addUserInGame : addUserInGame,
        findGamesByName : findGamesByName,
        findAllOpenGames : findAllOpenGames
    };
    return api;

    function findAllOpenGames(){
        var deferred = q.defer();
        GameModel.find({status: "open"}, function (err, doc){
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

    function findGamesByName(gameName){
        var deferred = q.defer();
        GameModel.find({title: gameName}, function (err, doc){
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

    function addUserInGame(username, gameName){
        var deferred = q.defer();
        GameModel.update({title: gameName}, {$push: {players: username}}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc)
                }
            });
        // return a promise
        return deferred.promise;
    }

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

    function findGamesForUser(username){
        var deferred = q.defer();
        GameModel.find({userId: username}, function (err, doc){
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

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function generateUniverse(companies){
        var temp = shuffle(companies);
        for (var i =0; i< temp.length; i++){
            temp[i].generated_name = generateName();
        }
        temp.slice(0,9);
        return temp;
    }

    function createGame (game, companies){
        var randomUniverse = generateUniverse(companies);

        var newGame = {
            title: game.title,
            userId: game.userId,
            players: game.players,
            duration: game.duration,
            universe: randomUniverse,
            currentTurn: game.currentTurn,
            status: "open"
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
