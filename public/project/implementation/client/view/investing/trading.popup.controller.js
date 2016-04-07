(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("TradingPopupController", TradingPopupController);

    function TradingPopupController($rootScope, $scope, $route) {
        $scope.accept = accept;
        $scope.init = init;
        $scope.cancel = cancel;

        function init() {
        }
        init();

        function cancel() {
            $rootScope.modalInstance.dismiss('cancel');
        }

        function accept() {
        }
    }
})();
