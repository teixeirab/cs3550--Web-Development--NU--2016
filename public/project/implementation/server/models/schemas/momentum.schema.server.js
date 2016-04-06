module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var MomentumSchema = mongoose.Schema({
        price: [Number],
        periods: [String]
    }, {collection: 'project.company.momentum'});
    return MomentumSchema;
};
