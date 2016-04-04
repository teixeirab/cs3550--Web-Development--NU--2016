module.exports = function(mongoose) {

    var PublisherSchema = mongoose.Schema({
        name: String,
        date: String,
        street: String,
        city: String,
        zip: Number,
        state: String,
        country: String
    }, {collection: 'database.publisher'});
    return PublisherSchema;

};