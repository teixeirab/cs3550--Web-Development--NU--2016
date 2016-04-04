(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("MomentumController", MometumController);

    function MometumController(CompanyService, $rootScope , $routeParams) {
        var vm = this;
        vm.company_data = [];
        var companyId = $routeParams.companyId;

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


        function renderBar(){
            var priceChart = {
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
                        data : vm.company_data.price
                    }
                ]
            };

            var revisionsChart = {
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
                        data : vm.company_data.revisions
                    }
                ]
            };

            var ctx = document.getElementById("priceChart").getContext("2d");
            var ctx2 = document.getElementById("revisionsChart").getContext("2d");

            window.myLine = new Chart(ctx).Line(priceChart, {responsive: true});
            window.myLine = new Chart(ctx2).Line(revisionsChart, {responsive: true});
        }
    }
})();