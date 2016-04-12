(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("NextTurnPopupController", NextTurnPopupController);

    function NextTurnPopupController($rootScope, oldPortfolio, newPortfolio, turn, $scope, PortfolioService, $location) {
        var vm = this;
        vm.init = init;

        function init() {
            vm.previousTurn = oldPortfolio;
            vm.thisTurn = newPortfolio;
            vm.turn = turn;
        }
        init();
    }
})();