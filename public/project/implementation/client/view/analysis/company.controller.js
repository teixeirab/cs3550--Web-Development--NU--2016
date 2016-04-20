(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("CompanyController", CompanyController);

    function CompanyController(CompanyService, PortfolioService, $routeParams, $rootScope, $uibModal) {
        var vm = this;
        vm.company_data = [];
        vm.identifier = $routeParams.identifier;
        vm.turn = $routeParams.turn;
        vm.generated_name = $routeParams.generatedName;
        vm.identifier = $routeParams.identifier;
        vm.portfolioId = $routeParams.portfolioId;
        vm.trade= trade;


        function init() {
            CompanyService
                .getCompanyData(vm.identifier, "summary")
                .then(function(response) {
                    if (response.data) {
                        vm.company_data = response.data;
                        renderBar();
                        variablesForTurn();
                    }
                });

            PortfolioService
                .findPortfolioById(vm.portfolioId)
                .then(function(response) {
                    if (response.data) {
                        vm.currentPortfolio = response.data;
                        $rootScope.$broadcast('new-game', vm.currentPortfolio.gameName)
                    }
                });

            var data = {
                turn: vm.turn,
                generated_name: vm.generated_name,
                identifier: vm.identifier,
                portfolioId: vm.portfolioId
            };
            $rootScope.$broadcast('company', data);
        }
        init();

        function trade(name){
            console.log(name);
            vm.selectedCompany = {
                name: name,
                shares: 1,
                tradeType: "Buy",
                currentPrice : vm.company_data.current_price[vm.turn]
            };

            $rootScope.modalInstance = $uibModal.open({
                templateUrl: 'view/investing/trading.popup.view.html',
                controller: 'TradingPopupController',
                controllerAs: "model",
                size: 'lg',
                resolve: {
                    selectedTrade : function () {
                        return  vm.selectedCompany
                    },
                    currentPortfolio : function () {
                        return  vm.currentPortfolio
                    }
                }
            });
        }

        function variablesForTurn(){
            vm.market_cap_turn = vm.company_data.market_cap[vm.turn];
            vm.current_price_turn = vm.company_data.current_price[vm.turn];
            vm.p_e_turn = vm.company_data.p_e[vm.turn];
            vm.p_b_turn = vm.company_data.p_b[vm.turn];
            vm.p_s_turn = vm.company_data.p_s[vm.turn];
            vm.pod_turn = vm.company_data.pod[vm.turn];
            vm.economic_leverage_turn = vm.company_data.economic_leverage[vm.turn];
            vm._90_day_volatility_turn = vm.company_data._90_day_volatility[vm.turn]
        }

        function getPeriods(){
            vm.periods = [];
            var j = 1;
            for (var i= 1; i <= 10; i++){
                if (i < vm.turn){
                    vm.periods.push("t"+i);
                }
                else {
                    vm.periods.push("fy"+j);
                    j++;
                }
            }
        }

        function renderBar(){
            getPeriods();
            var wacc = vm.company_data.WACC.slice(0, vm.turn -1);
            var roic = vm.company_data.roic.slice(0, vm.turn -1);
            roic.push(vm.company_data.roic_fy1[vm.turn - 1]);
            roic.push(vm.company_data.roic_fy1[vm.turn]);

            var roicChartData = [];
            for( var i = 0; i < vm.periods.length; i++ ) {
                if (vm.periods[i].substring(0,1)== "t"){
                    roicChartData.push( {
                        "periods": vm.periods[i],
                        "roic": roic[i],
                        "wacc": wacc[i],
                        "color1": "#2980B9",
                        "color2": "#82E0AA"
                    } )
                }
                else {
                    roicChartData.push( {
                        "periods": vm.periods[i],
                        "roic": roic[i],
                        "wacc": wacc[i - 1],
                        "color1": "#633974",
                        "color2": "#82E0AA"
                    } )
                }
            }
            CompanyService.createBarWithLineGraph(roicChartData, "roicChart", "roic", "wacc");

            var asset_growth = vm.company_data.asset_growth.slice(0, vm.turn -1);
            asset_growth.push(vm.company_data.asset_growth_fy1[vm.turn]);

            var growthChartData = [];
            for( var i = 0; i < vm.periods.length; i++ ) {
                if (vm.periods[i].substring(0,1)== "t"){
                    growthChartData.push( {
                        "periods": vm.periods[ i ],
                        "growth": asset_growth[ i ],
                        "color": "#633974"
                    } )
                }
                else {
                    growthChartData.push( {
                        "periods": vm.periods[ i ],
                        "growth": asset_growth[ i ],
                        "color": "#2980B9"
                    } )
                }
            }
            CompanyService.createBarGraph(growthChartData, "growthChart", "growth");

            var prices = vm.company_data.current_price.slice(0, vm.turn);

            var priceChartData = [];
            for( var i = 0; i < vm.periods.length; i++ ) {
                if (vm.periods[i].substring(0,1)== "t"){
                    priceChartData.push( {
                        "periods": vm.periods[i],
                        "prices": prices[i]
                    } )
                }
                else {
                    priceChartData.push( {
                        "periods": vm.periods[i],
                        "color": "#2980B9"
                    } )
                }
            }
            CompanyService.createLineGraph(priceChartData, "pricesChart", "prices");
        }
    }
})();
