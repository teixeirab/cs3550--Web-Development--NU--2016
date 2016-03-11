(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {
        $scope.$location = $location;
    }
})();