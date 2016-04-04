module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var SmtSchema = mongoose.Schema({
        statements_id: String,
        roic : [Number],
        asset_growth: [Number],
        sales: [Number],
        margins: [Number],
        turns: [Number],
        periods: [String]
    }, {collection: 'project.company.smt'});
    return SmtSchema;
};
