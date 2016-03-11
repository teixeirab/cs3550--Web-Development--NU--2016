(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("TradingController", TradingController);

    function TradingController($scope, $location) {
        $scope.$location = $location;
    }
})();
