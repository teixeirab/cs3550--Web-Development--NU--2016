module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var SummarySchema = mongoose.Schema({
        market_cap: [Number],
        sub_industry: String,
        current_price: [Number],
        p_e: [Number],
        p_b: [Number],
        p_s: [Number],
        roic: [Number],
        roic_fy1: [Number],
        asset_growth: [Number],
        asset_growth_fy1: [Number],
        periods: [String],
        pod: [Number],
        economic_leverage: [Number],
        _90_day_volatility: [Number],
        cfroi_revisions : [Number],
        price_change : [Number]
    }, {collection: 'project.company.summary'});
    return SummarySchema;
};