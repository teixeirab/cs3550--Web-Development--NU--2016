(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("MomentumController", MometumController);

    function MometumController(CompanyService , $routeParams) {
        var vm = this;
        vm.company_data = [];
        vm.generated_name = $routeParams.companyId;
        vm.turn = $routeParams.turn;
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
            var periods = [];
            for (var i =0; i <= 10; i++){
                if (i < vm.turn){
                    periods.push("t"+i);
                }
            }

            var priceChart = {
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
                        data : vm.company_data.price
                    }
                ]
            };
            var ctx = document.getElementById("priceChart").getContext("2d");
            window.myLine = new Chart(ctx).Line(priceChart, {responsive: true});
        }
    }
})();