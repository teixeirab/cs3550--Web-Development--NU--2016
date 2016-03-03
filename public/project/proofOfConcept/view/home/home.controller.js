(function(){
    angular
        .module("SimulationApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {
        $scope.$location = $location;
    }
})();
