(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("ReportsController", ReportsController);

    function ReportsController($scope, $location) {
        $scope.$location = $location;
    }
})();