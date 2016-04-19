(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("TradingPopupController", TradingPopupController);

    function TradingPopupController($rootScope, selectedTrade, currentPortfolio, $scope, PortfolioService, $location) {
        var vm = this;
        vm.init = init;
        vm.trade = trade;

        function init() {
            vm.selectedCompany = selectedTrade;
            vm.currentPortfolio = currentPortfolio;
        }
        init();

        function trade(selectedCompany){

            if (selectedCompany.currentPrice * selectedCompany.shares > vm.currentPortfolio.cash_remaining &&
                selectedCompany.tradeType === "Buy") {
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
                        console.log(response.data);
                        vm.currentPortfolio = response.data;
                        $scope.successMessage = "Trade has been submitted successfully";
                        $location.url("/portfolio/" + vm.currentPortfolio.gameName);
                    }
                });
        }

    }
})();
