module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var SmtSchema = mongoose.Schema({
        statements_id: String,
        roic : [Number],
        roic_fy1 : [Number],
        asset_growth: [Number],
        asset_growth_fy1: [Number],
        sales: [Number],
        margins: [Number],
        WACC: [Number],
        turns: [Number],
        periods: [String]
    }, {collection: 'project.company.smt'});
    return SmtSchema;
};
