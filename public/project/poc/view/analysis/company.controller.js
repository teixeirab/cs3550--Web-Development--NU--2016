(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("CompanyController", CompanyController);

    function CompanyController($scope, $location) {
        $scope.$location = $location;
    }
})();
