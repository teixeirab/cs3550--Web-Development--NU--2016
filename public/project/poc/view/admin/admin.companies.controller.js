(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminCompaniesController", AdminCompaniesController);

    function AdminCompaniesController($scope, InvestingService, $location, $rootScope) {
        $scope.companies = InvestingService.companies;
        $scope.addCompany = addCompany;
        $scope.deleteCompany = deleteCompany;
        $scope.updateCompany = updateCompany;
        $scope.selectCompany = selectCompany;

        function init(){
            var callback = function (response){
                $scope.companies = response;
            };
            InvestingService.findAllCompanies(callback)
        }

        init();

        function addCompany(company){
            InvestingService.createCompany(company, init);
        }

        function updateCompany(company){
            InvestingService.updateCompanyById(company._id, company, init);
            $scope.company = null;
        }

        function deleteCompany (company, callback){
            InvestingService.deleteCompanyById(company._id, init);
        }

        function selectCompany(index){
            $scope.company = $scope.companies[index];
        }

    }
})();
