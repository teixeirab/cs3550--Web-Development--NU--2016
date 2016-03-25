(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SearchController", SearchController);

    function SearchController(UserService, GameService, PortfolioService, CompanyService, $routeParams) {
        var vm = this;
        vm.searchText = $routeParams.text;
        vm.companies = [];
        vm.games = [];
        vm.portfolios = [];
        vm.users = [];

        function init(){
            if (vm.searchText){
                UserService
                    .getUsersByText(vm.searchText)
                    .then(function (response){
                        if(response.data) {
                            console.log(response.data)
                            vm.users = response.data
                        }
                    });
                PortfolioService
                    .findAllPortfoliosByText(vm.searchText)
                    .then(function (response){
                        if(response.data) {
                            vm.portfolios = response.data
                        }
                    });
                GameService
                    .findAllGamesByText(vm.searchText)
                    .then(function (response){
                        if(response.data) {
                            vm.games = response.data
                        }
                    });
                CompanyService
                    .findAllCompaniesByText(vm.searchText)
                    .then(function (response){
                        if(response.data) {
                            vm.companies = response.data
                        }
                    });
            }
        };
        init();
    }
})();