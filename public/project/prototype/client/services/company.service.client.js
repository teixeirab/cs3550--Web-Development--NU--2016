(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .factory("CompanyService", CompanyService);

    function CompanyService($http, $rootScope) {
        var api = {
            createCompany: createCompany,
            updateCompany: updateCompany,
            deleteCompany: deleteCompany,
            findAllCompanies: findAllCompanies,
            getCompanyData : getCompanyData,
            findAllCompaniesByTurn : findAllCompaniesByTurn,
            findAllCompaniesByText : findAllCompaniesByText
        };
        return api;

        function findAllCompaniesByText(text){
            return $http.get("/api/project/company/all/text/"+ text);
        }

        function findAllCompanies() {
            return $http.get("/api/project/company/");
        }

        function findAllCompaniesByTurn(turn) {
            return $http.get("/api/project/company/all/"+ turn);
        }

        function getCompanyData(companyId, reportType) {
            return $http.get("/api/project/company/"+ companyId +"/"+ reportType);
        }

        function createCompany(company){
            return $http.post("/api/project/company", company);
        }

        function updateCompany(companyId, company){
            return $http.put("/api/project/company/" + companyId, company);
        }

        function deleteCompany(companyId){
            return $http.delete("/api/project/company/"+ companyId);
        }

    }


})();
