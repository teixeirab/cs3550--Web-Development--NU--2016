(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminGamesController", AdminGamesController);

    function AdminGamesController($scope, UserService, $location, $rootScope) {
        $scope.users = UserService.users;
    }
})();
