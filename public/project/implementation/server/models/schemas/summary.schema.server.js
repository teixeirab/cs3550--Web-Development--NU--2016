module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var SummarySchema = mongoose.Schema({
        statements_id: String,
        market_cap: Number,
        sub_industry: String,
        current_price: Number,
        p_e: Number,
        p_b: Number,
        p_s: Number,
        roic: [Number],
        asset_growth: [Number],
        periods: [String],
        pod: Number,
        credit_rating: String,
        cfroi_revisions : [Number],
        price_change : [Number]
    }, {collection: 'project.company.summary'});
    return SummarySchema;
};