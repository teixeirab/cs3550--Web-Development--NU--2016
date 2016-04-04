(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SmtController", SmtController);

    function SmtController(CompanyService , $routeParams) {
        var vm = this;
        vm.company_data = [];
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
            var roicChart = {
                labels : vm.company_data.periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#1A5276",
                        strokeColor : "#1A5276",
                        pointColor : "#1A5276",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.roic
                    }
                ]
            };

            var growthChart = {
                labels : vm.company_data.periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#7D3C98",
                        strokeColor : "#7D3C98",
                        pointColor : "#7D3C98",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.asset_growth
                    }
                ]
            };

            var salesChart = {
                labels : vm.company_data.periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#229954",
                        strokeColor : "#229954",
                        pointColor : "#229954",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.sales
                    }
                ]
            };

            var marginsChart = {
                labels : vm.company_data.periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#F1C40F",
                        strokeColor : "#F1C40F",
                        pointColor : "#F1C40F",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.margins
                    }
                ]
            };

            var turnsChart = {
                labels : vm.company_data.periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#2980B9",
                        strokeColor : "#2980B9",
                        pointColor : "#2980B9",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.turns
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
