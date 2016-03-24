(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {
        $scope.$location = $location;
    }
})();
