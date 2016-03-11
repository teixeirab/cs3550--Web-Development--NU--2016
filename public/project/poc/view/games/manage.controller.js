(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("ManageController", ManageController);


    function ManageController($scope, GameService, $rootScope) {
        $scope.deleteGame = deleteGame;
        $scope.selectGame = selectGame;

        function renderForms(){
            var callback = function (response){
                $scope.games = response;
            };
            GameService.findAllGamesForUser($rootScope.currentUser._id, callback);
            $scope.game = null;
        }
        renderForms();

        function deleteGame(game){
            GameService.deleteGameById(game._id, renderForms);
        }

        function selectGame(index){
            $scope.game = $scope.games[index];
        }
    }

})();
