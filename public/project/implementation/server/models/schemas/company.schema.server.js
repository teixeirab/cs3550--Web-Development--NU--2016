module.exports = function(mongoose) {

    var SummarySchema = require("./summary.schema.server.js")(mongoose);
    var SmtSchema = require("./smt.schema.server.js")(mongoose);
    var ValuationSchema = require("./valuation.schema.server.js")(mongoose);
    var MomentumSchema = require("./momentum.schema.server.js")(mongoose);
    var ReportsSchema = require("./reports.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var CompanySchema = mongoose.Schema({
        statements_id: String,
        generated_name: String,
        turn: Number,
        real_name: String,
        summary: SummarySchema,
        smt: SmtSchema,
        valuation: ValuationSchema,
        momentum: MomentumSchema,
        reports: ReportsSchema
    }, {collection: 'project.company'});
    return CompanySchema;
};