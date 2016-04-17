(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("CreatePopupController", CreatePopupController);

    function CreatePopupController(username, $scope, GameService, $rootScope, $route) {
        var vm = this;
        vm.init = init;
        $scope.cancel = cancel;
        $scope.createGame= createGame;

        function init() {
        }
        init();

        function createGame (game){
            var newGame = {
                title: game.title,
                userId: username,
                players: [],
                duration: 10,
                universe: 10
            };

            GameService
                .createGame(newGame)
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