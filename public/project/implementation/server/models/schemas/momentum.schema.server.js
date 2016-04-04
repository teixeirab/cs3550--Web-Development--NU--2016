module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var MomentumSchema = mongoose.Schema({
        statements_id: String,
        price: [Number],
        revisions: [Number],
        periods: [String]
    }, {collection: 'project.company.momentum'});
    return MomentumSchema;
};
