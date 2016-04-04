module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var GameSchema = mongoose.Schema({
        title: String,
        userId: String,
        num_of_players: Number,
        players: [String],
        duration: Number,
        universe: Number,
        currentTurn: Number
    }, {collection: 'project.games'});
    return GameSchema;
};