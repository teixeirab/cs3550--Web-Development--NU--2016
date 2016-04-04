module.exports = function(mongoose) {

    var CompanySchema = require("./company.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var PortfolioSchema = mongoose.Schema({
        gameName: String,
        username: String,
        companies: [String],
        shares: [Number],
        prices: [Number],
        price_paid: [Number],
        return: [Number],
        total_value: [Number],
        weight: [Number],
        cash_remaining: Number,
        currentTurn: Number,
        portfolio_return : [Number]
    }, {collection: 'project.portfolio'});
    return PortfolioSchema;
};