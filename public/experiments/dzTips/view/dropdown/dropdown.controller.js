(function () {
    "use strict";
    angular
        .module("DZtipsApp")
        .controller("DropdownController", DropdownController);

    function DropdownController($scope, $location) {
        $scope.$location = $location;
    }
})();
