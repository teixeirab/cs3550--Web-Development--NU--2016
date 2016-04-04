module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        active: String,
        address: {street : String, city: String, zip: Number, state: String, country: String},
        date_of_creation: Date
    }, {collection: 'database.user'});
    return UserSchema;

};