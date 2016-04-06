(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("PortfolioController", PortfolioController);

    function PortfolioController($rootScope, GameService, PortfolioService, CompanyService) {
        var vm = this;
        vm.successMessage = null;
        vm.failureMessage = null;
        vm.currentUser = $rootScope.currentUser;
        vm.currentPortfolio = [];
        vm.summaryTable = [];
        vm.companies = [];
        vm.totalEquity = [];

        vm.buildTable = buildTable;
        vm.advance = advance;

        function init() {
            CompanyService
                .findAllCompanies()
                .then(function (response){
                    if(response.data) {
                        vm.companies = response.data
                    }
                });

            PortfolioService
                .findPortfolioForUser(vm.currentUser.username)
                .then(function(response){
                    vm.currentPortfolio = response.data;
                    buildTable();
                    renderBar();
                });
        }
        init();

        function advance(){
            PortfolioService
                .advanceTurnForGame(vm.currentPortfolio.gameName, vm.currentPortfolio.currentTurn + 1)
                .then(function(response){
                    init();
                });
        }

        function buildTable(){
            vm.summaryTable = [];
            vm.totalEquity = [];
            for (var i = 0; i < vm.currentPortfolio.holdings.length; i++){
                vm.totalEquity = Math.round(vm.totalEquity + vm.currentPortfolio.holdings[i].shares *
                    vm.currentPortfolio.holdings[i].prices[vm.currentPortfolio.currentTurn]);
                var company = {
                    name: vm.currentPortfolio.holdings[i].company_name,
                    shares: vm.currentPortfolio.holdings[i].shares,
                    prices: vm.currentPortfolio.holdings[i].prices[vm.currentPortfolio.currentTurn],
                    price_paid: vm.currentPortfolio.holdings[i].price_paid,
                    return: Math.round(((vm.currentPortfolio.holdings[i].prices[vm.currentPortfolio.currentTurn] /
                            vm.currentPortfolio.holdings[i].price_paid) - 1)*100),
                    total_value: vm.currentPortfolio.holdings[i].shares *
                            vm.currentPortfolio.holdings[i].prices[vm.currentPortfolio.currentTurn],
                    weight: vm.currentPortfolio.holdings[i].weight
                };
                vm.summaryTable.push(company)
            }
            console.log(vm.totalEquity)
        }

        function renderBar() {
            var periods = [];
            var j = 1;
            for (var i =0; i <= 10; i++){
                if (i < vm.currentPortfolio.currentTurn){
                    periods.push("t"+i);
                }
                else {
                    periods.push("fy"+j);
                    j++;
                }
            }

            var returnsChart = {
                labels: periods,
                datasets: [
                    {
                        label: "WFC ROE:",
                        fillColor: "#1A5276",
                        strokeColor: "#1A5276",
                        pointColor: "#1A5276",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: vm.currentPortfolio.portfolio_return
                    }
                ]
            };
            var ctx = document.getElementById("returnsChart").getContext("2d");
            window.myBar = new Chart(ctx).Bar(returnsChart, {responsive: true});
        }
    }
})();