module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ReportsSchema = mongoose.Schema({
        statements_id: String
    }, {collection: 'project.company.reports'});
    return ReportsSchema;
};