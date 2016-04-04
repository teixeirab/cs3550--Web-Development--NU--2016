module.exports = function(mongoose) {
    var AuthorSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        date_of_birth: Date
    }, {collection: 'database.author'});
    return AuthorSchema;
};