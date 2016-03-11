(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("ValuationController", ValuationController);

    function ValuationController($scope, $location) {
        $scope.$location = $location;
    }
})();
