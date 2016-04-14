(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("MomentumController", MometumController);

    function MometumController(CompanyService , $routeParams) {
        var vm = this;
        vm.company_data = [];
        vm.identifier = $routeParams.identifier;
        vm.turn = $routeParams.turn;
        var companyId = $routeParams.identifier;
        vm.generated_name = $routeParams.generatedName;

        function init() {
            var companyId = $routeParams.companyId;
            CompanyService
                .getCompanyData(companyId, "momentum")
                .then(function(response) {
                    if (response.data) {
                        vm.company_data = response.data;
                        renderBar()
                    }
                });
        }
        init();

        function getPeriods(){
            vm.periods = [];
            var j = 1;
            for (var i =0; i <= 10; i++){
                if (i < vm.turn){
                    vm.periods.push("t"+i);
                }
                else {
                    vm.periods.push("fy"+j);
                    j++;
                }
            }
        }

        function renderBar() {
            var prices = vm.company_data.price;
            getPeriods();

            var pricesChartData = [];
            for (var i = 0; i < vm.periods.length; i++) {
                if (vm.periods[i].substring(0, 1) == "t") {
                    pricesChartData.push({
                        "periods": vm.periods[i],
                        "prices": prices[i],
                        "color": "#2980B9"
                    })
                }
            }
            CompanyService.createLineGraph(pricesChartData, "pricesChart", "prices");
        }
    }
})();