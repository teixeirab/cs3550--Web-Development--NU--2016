module.exports = function(app, userModel, gameModel, companyModel, portfolioModel) {

    app.get("/api/project/company/all/:turn", findAllCompaniesByTurn);
    app.get("/api/project/company", findAllCompanies);
    app.post("/api/project/company", createCompany);
    app.delete("/api/project/company/:companyId", deleteCompany);
    app.put("/api/project/company/:companyId", updateCompany);
    app.get("/api/project/company/:companyId/:reportType", getCompanyData);
    app.get("/api/project/company/all/text/:text", findAllCompaniesByTurn);

    function findAllCompaniesByText(req, res){
        var text = req.params.text;
        console.log(text);
        var companies = companyModel.findAllCompaniesByText(text);
        res.json(companies);
    }

    function findAllCompanies(req, res) {
        var companies = companyModel.findAllCompanies();
        res.json(companies);
    }

    function findAllCompaniesByTurn(req, res) {
        var turn = req.params.turn;
        var companies = companyModel.findAllCompaniesByTurn(turn);
        res.json(companies);
    }

    function getCompanyData(req, res) {
        var reportType = req.params.reportType;
        var companyId = req.params.companyId;
        var company_data = companyModel.getCompanyData(companyId, reportType);
        res.json(company_data);
    }

    function createCompany(req, res) {
        var user = req.body;
        var companies = companyModel.createCompany(user);
        res.json(companies);
    }

    function deleteCompany(req, res) {
        var companyId = req.params.companyId;
        var companies = companyModel.deleteCompany(companyId);
        res.json(companies);
    }

    function updateCompany(req, res) {
        var companyId = req.params.companyId;
        var newCompany = req.body;
        var companies = companyModel.updateCompany(companyId, newCompany);
        res.json(companies);
    }
};
