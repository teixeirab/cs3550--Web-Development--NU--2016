(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;

        $scope.$on('game-over', function(){
            $scope.register = true;
        });

        $scope.$on('new-game', function(){
            $scope.register = false;
        });

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();
