(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("TradingPopupController", TradingPopupController);

    function TradingPopupController(selectedTrade, currentPortfolio, $scope, PortfolioService) {
        var vm = this;
        vm.init = init;
        vm.cancel = cancel;
        vm.trade = trade;

        function init() {
            vm.selectedCompany = selectedTrade;
            vm.currentPortfolio = currentPortfolio;
        }
        init();

        function cancel() {
            vm.modalInstance.dismiss('cancel');
        }

        function trade(selectedCompany){

            if (selectedCompany.currentPrice * selectedCompany.shares > vm.currentPortfolio.cash_remaining) {
                $scope.failureMessage = "You do not have enough cash for this trade!";
                return;
            }

            var portfolio_trade = {
                selectedCompany : selectedCompany,
                portfolio : vm.currentPortfolio
            };

            PortfolioService
                .tradeCompanyForUser(portfolio_trade)
                .then (function (response){
                    if(response.data) {
                        $scope.successMessage = "Trade has been submitted successfully";
                    }
                });
        }

    }
})();
