(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("PortfolioController", PortfolioController);

    function PortfolioController($rootScope, GameService, PortfolioService) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.currentPortfolio = [];
        vm.summaryTable = [];
        vm.buildTable = buildTable;


        function init() {
            PortfolioService
                .findPortfolioForUser()
                .then(function(response){
                    vm.currentPortfolio = response.data;
                    buildTable();
                    renderBar();
                });
        }

        init();

        function buildTable(){
            for (var i = 0; i < vm.currentPortfolio.companies.length; i++){
                var company = {
                    _id: vm.currentPortfolio.companies[i],
                    shares: vm.currentPortfolio.shares[i],
                    prices: vm.currentPortfolio.prices[i],
                    price_paid: vm.currentPortfolio.prices_paid[i],
                    return: vm.currentPortfolio.return[i],
                    total_value: vm.currentPortfolio.total_value[i],
                    weight: vm.currentPortfolio.weight[i]
                };
                vm.summaryTable.push(company)
            }
        }

        function renderBar() {
            var returnsChart = {
                labels: vm.currentPortfolio.labels,
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