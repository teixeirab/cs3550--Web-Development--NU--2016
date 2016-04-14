module.exports = function(mongoose) {

    var CompanySchema = require("./company.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var GameSchema = mongoose.Schema({
        title: String,
        userId: String,
        players: [String],
        duration: Number,
        universe: [CompanySchema],
        status: String,
        currentTurn: Number
    }, {collection: 'project.games'});
    return GameSchema;
};