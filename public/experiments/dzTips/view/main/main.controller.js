(function () {
    "use strict";
    angular
        .module("DZtipsApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();
