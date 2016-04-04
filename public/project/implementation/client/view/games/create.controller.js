(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("CreateController", CreateController);

    function CreateController($scope, GameService, $location) {
        $scope.message = null;
        var vm = this;
        vm.create = create;

        function init() {
        }
        init();

        function create(game) {
            $scope.message = null;

            if (game == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!game.title) {
                $scope.message = "Please provide a title";
                return;
            }

            var newGame = {
                _id: game._id,
                title: game.title,
                userId: game.userId,
                players: game.players,
                duration: game.duration,
                universe: game.universe,
                currentTurn: 1
            };

            GameService
                .createGame(game)
                .then(function (response) {
                    $location.url("/manage");
                });
        }

    }
})();
