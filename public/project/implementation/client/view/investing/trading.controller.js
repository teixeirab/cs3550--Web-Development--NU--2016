(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("TradingController", TradingController);

    function TradingController(CompanyService, PortfolioService, $rootScope, $scope) {
        var vm = this;
        $scope.showFailureMessage = false;
        $scope.showSuccessMessage = false;
        $scope.successMessage = null;
        $scope.failureMessage = null;
        vm.companies = [];
        vm.currentPortfolio = [];
        vm.currentTurn = 1;
        vm.currentUser = $rootScope.currentUser;

        vm.refresh = refresh;
        vm.buy = buy;
        vm.sell = sell;
        vm.trade = trade;

        function init() {
            PortfolioService
                .findPortfolioForUser(vm.currentUser.username)
                .then(function(response){
                    vm.currentPortfolio = response.data;
                    vm.currentTurn = response.data.currentTurn;
                });

            CompanyService
                .findAllCompanies()
                .then(function (response){
                    if(response.data) {
                        vm.companies = response.data
                    }
                });
        }
        init();

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

        function refresh(selectedCompany){
            var currentPrice;
            var prices;
            for (var i = 0; i < vm.companies.length; i++){
                if (vm.companies[i].generated_name === selectedCompany.name){
                    currentPrice = vm.companies[i].summary.current_price[vm.currentTurn];
                    prices = vm.companies[i].summary.current_price;
                }
            }

            vm.selectedCompany = {
                name: selectedCompany.name,
                shares: selectedCompany.shares,
                currentPrice : currentPrice,
                tradeType: selectedCompany.tradeType,
                prices : prices
            }
        }

        function buy(index){
            var temp;
            temp = {
                name: vm.companies[index].generated_name,
                shares: 1,
                tradeType: "Buy"
            };
            refresh(temp)
        }

        function sell(index){
            var temp;
            temp = {
                name: vm.companies[index].generated_name,
                shares: 1,
                tradeType: "Sell"
            };
            refresh(temp)
        }


    }
})();
