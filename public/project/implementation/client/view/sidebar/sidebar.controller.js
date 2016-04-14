(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, UserService, $routeParams) {
        $scope.$location = $location;
        $scope.logout = logout;


        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();
