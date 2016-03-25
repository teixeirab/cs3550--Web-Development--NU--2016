var companies = require("./data/companies.mock.json");
var companies_summary_data = require("./data/companies_data/summary.companies.mock.json");
var companies_smt = require("./data/companies_data/smt.companies.mock.json");
var companies_valuation = require("./data/companies_data/valuation.companies.mock.json");
var companies_reports = require("./data/companies_data/reports.companies.mock.json");
var companies_momentum = require("./data/companies_data/momentum.companies.mock.json");
module.exports = function(uuid) {
        var api = {
            findAllCompanies : findAllCompanies,
            createCompany : createCompany,
            deleteCompany : deleteCompany,
            updateCompany : updateCompany,
            getCompanyData : getCompanyData,
            findAllCompaniesByTurn : findAllCompaniesByTurn,
            findAllCompaniesByText : findAllCompaniesByText
        };

        return api;

        function findAllCompanies(){
            return companies;
        }

        function findAllCompaniesByText(text){
            var temp = [];
            for(var c in companies){
                if (companies[c].name === text){
                    temp.push(companies[c]);
                }
            }
            console.log(temp);
            return temp;
        }

        function findAllCompaniesByTurn(turn){
            var companies_temp =[];
            for(var c in companies){
                if (companies[c].turn === turn){
                    companies_temp.push(companies[c]);
                }
            }
            return companies_temp;
        }

        function getCompanyData(companyId, reportType){
            var database;
            if (reportType === "summary"){
                database = companies_summary_data
            }
            if (reportType === "smt"){
                database = companies_smt
            }
            if (reportType === "valuation"){
                database = companies_valuation
            }
            if (reportType === "risk"){
                database = companies_risk
            }
            if (reportType === "reports"){
                database = companies_reports
            }
            if (reportType === "momentum"){
                database = companies_momentum
            }

            for (var f in database){
                if (database[f]._id === companyId) {
                    return database[f];
                }
            }
            return null;
        }

        function createCompany (company){
            var newCompany = {
                _id: company._id,
                turn: company.turn,
                name: company.name,
                price: company.price,
                market_cap: company.market_cap,
            };
            companies.push(newCompany);
            return companies;
        }

        function deleteCompany(companyId){
            for (var f in companies) {
                if (companies[f]._id === companyId) {
                    companies.splice(f, 1);
                }
            }
            return companies;
        }

        function updateCompany (companyId, newCompany) {
            for (var f in companies) {
                if (companies[f]._id === companyId) {
                    companies[f] = newCompany;
                }
            }
            return companies;
        }
};

