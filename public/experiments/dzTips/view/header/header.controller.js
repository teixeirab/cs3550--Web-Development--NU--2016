(function () {
    "use strict";
    angular
        .module("DZtipsApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }
})();

