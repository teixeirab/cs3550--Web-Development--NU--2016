(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SmtController", SmtController);

    function SmtController($scope, $location) {
        $scope.$location = $location;
    }
})();
