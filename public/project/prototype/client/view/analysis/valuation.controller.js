(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("ValuationController", ValuationController);

    function ValuationController(CompanyService, $rootScope , $routeParams) {
        var vm = this;
        vm.company_data = [];
        var companyId = $routeParams.companyId;

        function init() {
            var companyId = $routeParams.companyId;
            CompanyService
                .getCompanyData(companyId, "valuation")
                .then(function(response) {
                    if (response.data) {
                        vm.company_data = response.data;
                        renderBar();
                    }
                });
        }
        init();


        function renderBar(){
            var peChart = {
                labels : vm.company_data.labels,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#1A5276",
                        strokeColor : "#1A5276",
                        pointColor : "#1A5276",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.pe
                    }
                ]
            };

            var pbChart = {
                labels : vm.company_data.labels,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#7D3C98",
                        strokeColor : "#7D3C98",
                        pointColor : "#7D3C98",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.pb
                    }
                ]
            };

            var psChart = {
                labels : vm.company_data.labels,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#229954",
                        strokeColor : "#229954",
                        pointColor : "#229954",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.ps
                    }
                ]
            };

            var ev_ebitda = {
                labels : vm.company_data.labels,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#F1C40F",
                        strokeColor : "#F1C40F",
                        pointColor : "#F1C40F",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.ev_ebitda
                    }
                ]
            };


            var ctx = document.getElementById("peChart").getContext("2d");
            var ctx2 = document.getElementById("pbChart").getContext("2d");
            var ctx3 = document.getElementById("psChart").getContext("2d");
            var ctx4 = document.getElementById("ev_ebitda").getContext("2d");

            window.myLine = new Chart(ctx).Line(peChart, {responsive: true});
            window.myLine = new Chart(ctx2).Line(pbChart, {responsive: true});
            window.myLine = new Chart(ctx3).Line(psChart, {responsive: true});
            window.myLine = new Chart(ctx4).Line(ev_ebitda, {responsive: true});
        }
    }
})();
