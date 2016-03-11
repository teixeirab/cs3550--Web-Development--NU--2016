(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("CreateController", CreateController);

    function CreateController($scope, GameService, $rootScope, $location) {
        $scope.create = create;

        function create(game){
            $scope.message = "Username or Password Incorrect";
            GameService.createGameForUser($rootScope.currentUser._id, game);
            $location.url("/manage");
        }
    }
})();
