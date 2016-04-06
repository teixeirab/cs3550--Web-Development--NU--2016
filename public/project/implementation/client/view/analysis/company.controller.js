(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("CompanyController", CompanyController);

    function CompanyController(CompanyService, $routeParams) {
        var vm = this;
        vm.company_data = [];
        vm.generated_name = $routeParams.companyId;
        vm.turn = $routeParams.turn;
        var companyId = $routeParams.companyId;


        function init() {
            CompanyService
                .getCompanyData(companyId, "summary")
                .then(function(response) {
                    if (response.data) {
                        vm.company_data = response.data;
                        renderBar();
                        variablesForTurn();
                        console.log(vm.company_data);
                    }
                });
        }
        init();

        function variablesForTurn(){
            vm.market_cap_turn = vm.company_data.market_cap[vm.turn];
            vm.current_price_turn = vm.company_data.current_price[vm.turn];
            vm.p_e_turn = vm.company_data.p_e[vm.turn];
            vm.p_b_turn = vm.company_data.p_b[vm.turn];
            vm.p_s_turn = vm.company_data.p_s[vm.turn];
            vm.pod_turn = vm.company_data.pod[vm.turn];
            vm.economic_leverage_turn = vm.company_data.economic_leverage[vm.turn];
            vm._90_day_volatility_turn = vm.company_data._90_day_volatility[vm.turn]
        }


        function renderBar(){
            var roic = vm.company_data.roic.slice(0, vm.turn);
            roic.push(vm.company_data.roic_fy1[vm.turn]);

            var asset_growth = vm.company_data.asset_growth.slice(0, vm.turn);
            asset_growth.push(vm.company_data.asset_growth_fy1[vm.turn]);

            var periods = [];
            var j = 1;
            for (var i =0; i <= 10; i++){
                if (i < vm.turn){
                    periods.push("t"+i);
                }
                else {
                    periods.push("fy"+j);
                    j++;
                }
            }

            var roicChart = {
                labels : periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#1A5276",
                        strokeColor : "#1A5276",
                        pointColor : "#1A5276",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : roic
                    }
                ]
            };

            var growthChart = {
                labels : periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#7D3C98",
                        strokeColor : "#7D3C98",
                        pointColor : "#7D3C98",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : asset_growth
                    }
                ]
            };

            var ctx = document.getElementById("roicChart").getContext("2d");
            var ctx2 = document.getElementById("growthChart").getContext("2d");
            window.myBar = new Chart(ctx).Bar(roicChart, {responsive: true});
            window.myBar = new Chart(ctx2).Bar(growthChart, {responsive: true});
        }


    }
})();
