(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("ValuationController", ValuationController);

    function ValuationController($scope, $location) {
        $scope.$location = $location;
        var wfcRoe = [21.96, 20.32, 21.84, 6.98, 15.23, 10.06];
        var roeLabels = [2005,2006,2007,2008,2009,2010];

        function renderBar(){
            var lineChartData = {
                labels : roeLabels,
                datasets : [
                    {
                        label: "WFC ROE:",
                        fillColor : "blue",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : wfcRoe
                    }
                ]
            };


            var ctx = document.getElementById("a").getContext("2d");
            var ctx2 = document.getElementById("b").getContext("2d");
            var ctx3 = document.getElementById("c").getContext("2d");
            var ctx4 = document.getElementById("d").getContext("2d");
            var ctx5 = document.getElementById("e").getContext("2d");

            window.myLine = new Chart(ctx).Line(lineChartData, {responsive: true});
            window.myLine = new Chart(ctx2).Line(lineChartData, {responsive: true});
            window.myLine = new Chart(ctx3).Line(lineChartData, {responsive: true});
            window.myLine = new Chart(ctx4).Line(lineChartData, {responsive: true});
            window.myLine = new Chart(ctx5).Line(lineChartData, {responsive: true});
        }
        renderBar();
    }
})();
