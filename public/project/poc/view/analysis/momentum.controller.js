(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("MomentumController", MometumController);

    function MometumController($scope, $location) {
        $scope.$location = $location;
    }
})();