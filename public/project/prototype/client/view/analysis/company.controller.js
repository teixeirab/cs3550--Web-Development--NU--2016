(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("CompanyController", CompanyController);

    function CompanyController(CompanyService, $rootScope , $routeParams) {
        var vm = this;
        vm.company_data = [];
        var companyId = $routeParams.companyId;

        function init() {
            var companyId = $routeParams.companyId;
            CompanyService
                .getCompanyData(companyId, "summary")
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
                        data : vm.company_data.roic
                    }
                ]
            };

            var growthChart = {
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
                        data : vm.company_data.asset_growth
                    }
                ]
            };

            var ctx = document.getElementById("canvas4").getContext("2d");
            var ctx2 = document.getElementById("canvas5").getContext("2d");
            window.myBar = new Chart(ctx).Bar(roicChart, {responsive: true});
            window.myBar = new Chart(ctx2).Bar(growthChart, {responsive: true});
        }


    }
})();
