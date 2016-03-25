(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {
        $scope.$location = $location;

        function init(){
            if ($location.url() === "#/home"){
                $scope.showSideBar = false
            }
            if ($location.url() != "#/home"){
                $scope.showSideBar = true
            }
        }
        init();

    }
})();