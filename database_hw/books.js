module.exports = function(mongoose) {
    var AuthorSchema = require("./author.js")(mongoose);
    var PublisherSchema = require("./publishers.js")(mongoose);
    var UserSchema = require("./users.js")(mongoose);

    // use mongoose to declare a user schema
    var BookSchema = mongoose.Schema({
        title: String,
        author: AuthorSchema,
        isbn: String,
        publisher: PublisherSchema,
        available: String,
        pages: Number,
        summary: String,
        subjects: [String],
        notes: {user: UserSchema, notebody: String},
        language: String
    }, {collection: 'database.book'});
    return BookSchema;
};