(function () {
    "use strict";
    angular
        .module("DZtipsApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {
        $scope.$location = $location;
    }
})();