(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminCompaniesController", AdminCompaniesController);

    function AdminCompaniesController(CompanyService, $routeParams) {
        var vm = this;
        vm.companies = [];
        var companyId = $routeParams.companyId;
        vm.deleteCompany = deleteCompany;
        vm.updateCompany = updateCompany;
        vm.selectCompany = selectCompany;
        vm.addCompany = addCompany;

        function init() {
            CompanyService
                .findAllCompanies()
                .then(function (response){
                    if(response.data) {
                        vm.companies = response.data
                    }
                })
        }
        init();

        function deleteCompany(company){
            CompanyService
                .deleteCompany(company._id)
                .then(function(response){
                    if(response.data) {
                        init();
                    }
                });
        }

        function updateCompany(company){
            CompanyService
                .updateCompany(company._id, company)
                .then(function(response){
                    if(response.data) {
                        init();
                    }
                });
        }

        function selectCompany(index){
            vm.company = vm.companies[index];
        }

        function addCompany(company){
            CompanyService
                .createCompany(company)
                .then(function(response){
                    if(response.data) {
                        init();
                    }
                });
        }
    }
})();

