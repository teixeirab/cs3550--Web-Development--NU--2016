(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("EditGamePopupController", EditGamePopupController);

    function EditGamePopupController(game, username, $scope, GameService, $rootScope, $route) {
        var vm = this;
        vm.init = init;
        $scope.cancel = cancel;
        $scope.editGame= editGame;


        function init() {
            $scope.game = game;
        }
        init();

        function editGame (game){
            var newGame = {
                _id: game._id,
                title: game.title,
                userId: username,
                players: game.players,
                duration: game.duration,
                status: game.status
            };

            GameService
                .updateGame(game._id, newGame)
                .then(function (response) {
                    if (response.data) {
                        $route.reload();
                        $rootScope.modalInstance.dismiss('cancel');
                    }
                });
        }

        function cancel() {
            $rootScope.modalInstance.dismiss('cancel');
        }
    }
})();