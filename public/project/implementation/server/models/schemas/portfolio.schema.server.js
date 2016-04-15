module.exports = function(mongoose) {

    var CompanySchema = require("./company.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var PortfolioSchema = mongoose.Schema({
        gameName: String,
        username: String,
        holdings : [
            {
                identifier: Number,
                company_name : String,
                shares: Number,
                price: Number,
                price_paid: Number,
                return: Number,
                total_value: Number,
                weight: Number,
                prices: [Number]
            }
        ],
        cash_remaining: Number,
        currentTurn: Number,
        portfolio_return : [Number],
        status: String
    }, {collection: 'project.portfolio'});
    return PortfolioSchema;
};