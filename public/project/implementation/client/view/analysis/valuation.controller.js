(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("ValuationController", ValuationController);

    function ValuationController(CompanyService , $routeParams) {
        var vm = this;
        vm.company_data = [];
        vm.generated_name = $routeParams.companyId;
        vm.turn = $routeParams.turn;
        var companyId = $routeParams.companyId;

        function init() {
            var companyId = $routeParams.companyId;
            CompanyService
                .getCompanyData(companyId, "valuation")
                .then(function(response) {
                    if (response.data) {
                        vm.company_data = response.data;
                        renderBar();
                        console.log(vm.company_data.periods)
                        console.log(vm.company_data.pe.slice(0,vm.turn));
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

            var peChart = {
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
                        data : vm.company_data.pe.slice(0,vm.turn)
            }
                ]
            };

            var pbChart = {
                labels: periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#7D3C98",
                        strokeColor : "#7D3C98",
                        pointColor : "#7D3C98",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.pb.slice(0,vm.turn)
                    }
                ]
            };

            var psChart = {
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
                        data : vm.company_data.ps.slice(0,vm.turn)
                    }
                ]
            };

            var ev_ebitda = {
                labels: periods,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "#F1C40F",
                        strokeColor : "#F1C40F",
                        pointColor : "#F1C40F",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : vm.company_data.ev_ebitda.slice(0,vm.turn)
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
