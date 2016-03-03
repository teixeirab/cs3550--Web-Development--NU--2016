(function(){
    angular
        .module("SimulationApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {
        $scope.$location = $location;
    }
})();
