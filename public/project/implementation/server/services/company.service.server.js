module.exports = function(app, userModel, gameModel, companyModel, portfolioModel) {

    app.get("/api/project/company", findAllCompanies);
    app.post("/api/project/company", createCompany);
    app.delete("/api/project/company/:companyId", deleteCompany);
    app.put("/api/project/company/:companyId", updateCompany);
    app.get("/api/project/company/:companyId/:reportType", getCompanyData);
    app.get("/api/project/company/all/search/:text", findAllCompaniesByText);

    function findAllCompaniesByText(req, res){
        var text = req.params.text;
        var companies = companyModel.findAllCompaniesByText(text);
        res.json(companies);
    }

    function findAllCompanies(req, res) {
        var companies = companyModel.findAllCompanies()
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getCompanyData(req, res) {
        var reportType = req.params.reportType;
        var companyId = req.params.companyId;
        var company_data = companyModel.getCompanyData(companyId, reportType)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function createCompany(req, res) {
        var user = req.body;
        var companies = companyModel.createCompany(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteCompany(req, res) {
        var companyId = req.params.companyId;
        var companies = companyModel.deleteCompany(companyId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateCompany(req, res) {
        var companyId = req.params.companyId;
        var newCompany = req.body;
        var companies = companyModel.updateCompany(companyId, newCompany)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
};
