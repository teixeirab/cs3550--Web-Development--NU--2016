(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();
