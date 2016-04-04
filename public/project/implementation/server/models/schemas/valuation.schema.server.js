module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ValuationSchema = mongoose.Schema({
        statements_id: String,
        pe: [Number],
        pb: [Number],
        ps: [Number],
        ev_ebitda: [Number],
        periods: [String]
    }, {collection: 'project.company.valuation'});
    return ValuationSchema;
};
