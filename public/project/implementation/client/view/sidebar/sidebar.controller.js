(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;
        $scope.ranking = true;

        $scope.$on('game-over', function(){
            $scope.register = true;
            $scope.ranking = true;
        });

        $scope.$on('game-out', function(){
            $scope.ranking = false;
        });

        $scope.$on('new-game', function(event, data){
            $scope.currentGame = data;
            $scope.register = false;
            $scope.ranking = true;
        });

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();
