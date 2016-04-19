//var company = require("./data/company.example2.json");
var q = require("q");
module.exports = function(db, mongoose) {

    // load user schema
    var CompanySchema = require("./schemas/company.schema.server.js")(mongoose);

    // create user model from schema
    var CompanyModel = mongoose.model('Company', CompanySchema);

    //CompanyModel.create(company);

    var api = {
        findAllCompanies : findAllCompanies,
        createCompany : createCompany,
        deleteCompany : deleteCompany,
        updateCompany : updateCompany,
        getCompanyData : getCompanyData,
        findAllCompaniesByText : findAllCompaniesByText
    };

    return api;

    function findAllCompaniesByText(text){
        var deferred = q.defer();
        CompanyModel.find({ $or: [{real_name: text}, {identifier: text}]},
            function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findAllCompanies(){
        var deferred = q.defer();
        CompanyModel.find('company', function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function getCompanyData(companyId, reportType){
        var deferred = q.defer();
        CompanyModel.findOne({identifier : companyId}, function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    if(reportType === "summary"){
                        deferred.resolve(doc.summary);
                    }
                    if(reportType === "smt"){
                        deferred.resolve(doc.smt);
                    }
                    if(reportType === "valuation"){
                        deferred.resolve(doc.valuation);
                    }
                    if(reportType === "momentum"){
                        deferred.resolve(doc.momentum);
                    }
                    if(reportType === "momentum"){
                        deferred.resolve(doc.reports);
                    }
                }
            }
        );
        return deferred.promise;
    }

    function createCompany (company){
        var deferred = q.defer();
        var newCompany = {
            statements_id:  company.turn + "_" + company.generated_name,
            generated_name: company.generated_name,
            turn: company.turn,
            real_name: company.real_name,
            /*
            summary: company.summary,
            smt: company.smt,
            valuation: company.valuation,
            momentum: company.momentum,
            reports: company.reports
            */

        };

        // insert new user with mongoose user model's create()
        CompanyModel.create(newCompany, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function deleteCompany(companyId){
        var deferred = q.defer();
        CompanyModel.findByIdAndRemove(companyId, function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function updateCompany (companyId, newCompany) {
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        CompanyModel.findByIdAndUpdate(companyId, newCompany, {new: true}, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }


};

