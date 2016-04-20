(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SmtController", SmtController);

    function SmtController(CompanyService,PortfolioService, $routeParams, $rootScope) {
        var vm = this;
        vm.company_data = [];
        vm.identifier = $routeParams.identifier;
        vm.turn = $routeParams.turn;
        vm.identifier = $routeParams.identifier;
        vm.generated_name = $routeParams.generatedName;
        vm.portfolioId = $routeParams.portfolioId;

        function init() {
            CompanyService
                .getCompanyData(vm.identifier, "smt")
                .then(function(response) {
                    if (response.data) {
                        vm.company_data = response.data;
                        renderBar();
                    }
                });
            PortfolioService
                .findPortfolioById(vm.portfolioId)
                .then(function(response) {
                    if (response.data) {
                        vm.currentPortfolio = response.data;
                        $rootScope.currentGame = vm.currentPortfolio.gameName
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
            asset_growth.push(vm.company_data.asset_growth_fy1[vm.turn])

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

            var sales = vm.company_data.sales.slice(0, vm.turn);
            var turns = vm.company_data.turns.slice(0, vm.turn);
            var margins = vm.company_data.margins.slice(0, vm.turn);

            var salesChartData = [];
            for( var i = 0; i < vm.periods.length; i++ ) {
                if (vm.periods[i].substring(0,1)== "t"){
                    salesChartData.push( {
                        "periods": vm.periods[ i ],
                        "sales": sales[ i ],
                        "color": "#1D8348"
                    } )
                }
                else {
                    salesChartData.push( {
                        "periods": vm.periods[ i ],
                        "sales": sales[ i ],
                        "color": "#2980B9"
                    } )
                }
            }

            CompanyService.createBarGraph(salesChartData, "salesChart", "sales");

            var marginsChartData = [];
            for( var i = 0; i < vm.periods.length; i++ ) {
                if (vm.periods[i].substring(0,1)== "t"){
                    marginsChartData.push( {
                        "periods": vm.periods[ i ],
                        "margins": margins[ i ],
                        "color": "#F1C40F"
                    } )
                }
                else {
                    marginsChartData.push( {
                        "periods": vm.periods[ i ],
                        "margins": margins[ i ],
                        "color": "#F1C40F"
                    } )
                }
            }

            CompanyService.createBarGraph(marginsChartData, "marginsChart", "margins");

            var turnsChartData = [];
            for( var i = 0; i < vm.periods.length; i++ ) {
                if (vm.periods[i].substring(0,1)== "t"){
                    turnsChartData.push( {
                        "periods": vm.periods[ i ],
                        "turns": margins[ i ],
                        "color": "#AED6F1"
                    } )
                }
                else {
                    turnsChartData.push( {
                        "periods": vm.periods[ i ],
                        "turns": margins[ i ],
                        "color": "#AED6F1"
                    } )
                }
            }

            CompanyService.createBarGraph(turnsChartData, "turnsChart", "turns");

        }
    }
})();
