(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("TradingController", TradingController);

    function TradingController(CompanyService, PortfolioService, $routeParams, $rootScope) {
        var vm = this;
        vm.companies = [];
        vm.currentTurn = 1;
        vm.selectCompany = selectCompany;

        function init() {
            PortfolioService
                .findPortfolioForUser($rootScope.currentUser)
                .then(function (response){
                    if(response.data) {
                        vm.currentTurn = response.data.currentTurn
                    }
                });
            CompanyService
                .findAllCompaniesByTurn(vm.currentTurn)
                .then(function (response){
                    if(response.data) {
                        vm.companies = response.data
                        console.log(vm.companies);
                    }
                });
        }
        init();


        function selectCompany(index){
            vm.company = vm.companies[index];
        }

    }
})();
