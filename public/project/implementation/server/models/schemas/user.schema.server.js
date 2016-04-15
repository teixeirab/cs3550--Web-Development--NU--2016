module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        google:   {
            id:    String,
            token: String
        },
        facebook:   {
            id:    String,
            token: String
        },
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        role: String
    }, {collection: 'project.user'});
    return UserSchema;
};