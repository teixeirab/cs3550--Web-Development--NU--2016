(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SmtController", SmtController);

    function SmtController(CompanyService , $routeParams) {
        var vm = this;
        vm.company_data = [];
        vm.generated_name = $routeParams.companyId;
        vm.turn = $routeParams.turn;
        var companyId = $routeParams.companyId;

        function init() {
            var companyId = $routeParams.companyId;
            CompanyService
                .getCompanyData(companyId, "smt")
                .then(function(response) {
                    if (response.data) {
                        vm.company_data = response.data;
                        renderBar();
                    }
                });
        }
        init();


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

            var salesChart = {
                labels : periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#229954",
                        strokeColor : "#229954",
                        pointColor : "#229954",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.sales.slice(0, vm.turn)
                    }
                ]
            };

            var marginsChart = {
                labels : periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#F1C40F",
                        strokeColor : "#F1C40F",
                        pointColor : "#F1C40F",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.margins.slice(0, vm.turn)
                    }
                ]
            };

            var turnsChart = {
                labels : periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#2980B9",
                        strokeColor : "#2980B9",
                        pointColor : "#2980B9",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.turns.slice(0, vm.turn)
                    }
                ]
            };

            var ctx = document.getElementById("roicChart").getContext("2d");
            var ctx2 = document.getElementById("growthChart").getContext("2d");
            var ctx3 = document.getElementById("salesChart").getContext("2d");
            var ctx4 = document.getElementById("marginsChart").getContext("2d");
            var ctx5 = document.getElementById("turnsChart").getContext("2d");

            window.myBar = new Chart(ctx).Bar(roicChart, {responsive: true});
            window.myBar = new Chart(ctx2).Bar(growthChart, {responsive: true});
            window.myBar = new Chart(ctx3).Bar(salesChart, {responsive: true});
            window.myBar = new Chart(ctx4).Bar(marginsChart, {responsive: true});
            window.myBar = new Chart(ctx5).Bar(turnsChart, {responsive: true});
        }
    }
})();
