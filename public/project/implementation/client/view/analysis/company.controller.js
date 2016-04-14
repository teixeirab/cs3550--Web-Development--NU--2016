(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("CompanyController", CompanyController);

    function CompanyController(CompanyService, $routeParams, $rootScope, $uibModal) {
        var vm = this;
        vm.company_data = [];
        vm.identifier = $routeParams.identifier;
        vm.turn = $routeParams.turn;
        vm.generated_name = $routeParams.generatedName;
        var companyId = $routeParams.identifier;
        vm.trade= trade;


        function init() {
            CompanyService
                .getCompanyData(companyId, "summary")
                .then(function(response) {
                    if (response.data) {
                        vm.company_data = response.data;
                        renderBar();
                        variablesForTurn();
                    }
                });
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
            for (var i =0; i <= 10; i++){
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
            var roic = vm.company_data.roic.slice(0, vm.turn);
            roic.push(vm.company_data.roic_fy1[vm.turn]);

            var asset_growth = vm.company_data.asset_growth.slice(0, vm.turn);
            asset_growth.push(vm.company_data.asset_growth_fy1[vm.turn]);

            getPeriods();

            var roicChartData = [];
            for( var i = 0; i < vm.periods.length; i++ ) {
                if (vm.periods[i].substring(0,1)== "t"){
                    roicChartData.push( {
                        "periods": vm.periods[ i ],
                        "roic": roic[ i ],
                        "color": "#2980B9"
                    } )
                }
                else {
                    roicChartData.push( {
                        "periods": vm.periods[ i ],
                        "roic": roic[ i ],
                        "color": "#633974"
                    } )
                }
            }

            CompanyService.createBarGraph(roicChartData, "roicChart", "roic");

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
        }
    }
})();
