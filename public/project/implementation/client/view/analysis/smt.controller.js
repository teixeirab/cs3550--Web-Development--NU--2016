(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SmtController", SmtController);

    function SmtController(CompanyService , $routeParams) {
        var vm = this;
        vm.company_data = [];
        vm.generated_name = $routeParams.companyId;
        vm.turn = $routeParams.turn;
        var companyId = $routeParams.companyId;

        function init() {
            var companyId = $routeParams.companyId;
            CompanyService
                .getCompanyData(companyId, "smt")
                .then(function(response) {
                    if (response.data) {
                        vm.company_data = response.data;
                        renderBar();
                    }
                });
        }
        init();

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

            var sales = vm.company_data.sales.slice(0, vm.turn);
            var turns = vm.company_data.turns.slice(0, vm.turn);
            var margins = vm.company_data.margins.slice(0, vm.turn);

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
