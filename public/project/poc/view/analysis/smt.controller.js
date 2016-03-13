(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SmtController", SmtController);

    function SmtController($scope, $location) {
        $scope.$location = $location;
        var wfcRoe = [21.96, 20.32, 21.84, 6.98, 15.23, 10.06];
        var roeLabels = [2005,2006,2007,2008,2009,2010];

        function renderBar(){
            var barChartData = {
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


            var ctx = document.getElementById("canvas4").getContext("2d");
            var ctx2 = document.getElementById("canvas5").getContext("2d");
            var ctx3 = document.getElementById("canvas6").getContext("2d");
            var ctx4 = document.getElementById("canvas7").getContext("2d");
            var ctx5 = document.getElementById("canvas8").getContext("2d");

            window.myBar = new Chart(ctx).Bar(barChartData, {responsive: true});
            window.myBar = new Chart(ctx2).Bar(barChartData, {responsive: true});
            window.myBar = new Chart(ctx3).Bar(barChartData, {responsive: true});
            window.myBar = new Chart(ctx4).Bar(barChartData, {responsive: true});
            window.myBar = new Chart(ctx5).Bar(barChartData, {responsive: true});
        }
        renderBar();
    }
})();
