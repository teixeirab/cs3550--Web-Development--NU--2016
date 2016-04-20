(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .factory("CompanyService", CompanyService);

    function CompanyService($http, $rootScope) {
        var api = {
            createCompany: createCompany,
            updateCompany: updateCompany,
            deleteCompany: deleteCompany,
            findAllCompanies: findAllCompanies,
            getCompanyData : getCompanyData,
            findAllCompaniesByText : findAllCompaniesByText,
            createBarGraph: createBarGraph,
            createLineGraph: createLineGraph,
            createBarWithLineGraph : createBarWithLineGraph
        };
        return api;

        function findAllCompaniesByText(text){
            return $http.get("/api/project/company/all/search/"+ text);
        }

        function findAllCompanies() {
            return $http.get("/api/project/company/");
        }

        function getCompanyData(companyId, reportType) {
            return $http.get("/api/project/company/"+ companyId +"/"+ reportType);
        }

        function createCompany(company){
            return $http.post("/api/project/company", company);
        }

        function updateCompany(companyId, company){
            return $http.put("/api/project/company/" + companyId, company);
        }

        function deleteCompany(companyId){
            return $http.delete("/api/project/company/"+ companyId);
        }

        function createBarWithLineGraph(chartData, chartId, valueField1, valuefield2){
            return AmCharts.makeChart(chartId,
                {
                    "type": "serial",
                    "categoryField": "periods",
                    "dataProvider": chartData,
                    "backgroundAlpha": 1,
                    "borderAlpha": 1,
                    "borderColor": "#FFFFFF",
                    "startAlpha": 1,
                    "fontSize": 10,
                    "theme": "none",
                    "chartCursor": {"enabled": true},
                    "graphs": [
                        {
                            "fillAlphas": 1,
                            "id": "AmGraph-1",
                            "title": "graph 1",
                            "type": "column",
                            "valueField": valueField1,
                            "colorField": "color1",
                            "lineAlpha": 0,
                            "cornerRadiusTop": 8
                        },
                        {
                            "id": "graph2",
                            "bullet": "round",
                            "lineThickness": 3,
                            "bulletSize": 7,
                            "bulletBorderAlpha": 1,
                            "lineColor": "#82E0AA",
                            "bulletColor": "#82E0AA",
                            "useLineColorForBulletBorder": true,
                            "bulletBorderThickness": 3,
                            "fillAlphas": 0,
                            "lineAlpha": 1,
                            "title": "WACC",
                            "valueField": valuefield2,
                            "dashLengthField": "dashLengthLine"
                        }
                    ],
                    "categoryAxis": {
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "inside": true,
                        "tickLength": 0
                    },
                    "valueAxes": [
                        {
                            "id": "ValueAxis-1",
                            "title": "",
                            "minimum": -10,
                            "axisAlpha": 0,
                            "dashLength": 4,
                            "position": "left"
                        }
                    ]
                }
            );
        }

        function createBarGraph(chartData, chartId, valueField ){
            return AmCharts.makeChart(chartId,
                {
                    "type": "serial",
                    "categoryField": "periods",
                    "dataProvider": chartData,
                    "backgroundAlpha": 1,
                    "borderAlpha": 1,
                    "borderColor": "#FFFFFF",
                    "startAlpha": 1,
                    "fontSize": 10,
                    "theme": "none",
                    "chartCursor": {"enabled": true},
                    "graphs": [
                        {
                            "fillAlphas": 1,
                            "id": "AmGraph-1",
                            "title": "graph 1",
                            "type": "column",
                            "valueField": valueField,
                            "colorField": "color",
                            "lineAlpha": 0,
                            "cornerRadiusTop": 8
                        }
                    ],
                    "categoryAxis": {
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "inside": true,
                        "tickLength": 0
                    },
                    "valueAxes": [
                        {
                            "id": "ValueAxis-1",
                            "minimum": -10,
                            "axisAlpha": 0,
                            "dashLength": 4,
                            "position": "left"
                        }
                    ]
                }
            );
        }

        function createLineGraph(chartData, chartId, valueField ){
            return AmCharts.makeChart(chartId,
                {
                    "type": "serial",
                    "categoryField": "periods",
                    "dataProvider": chartData,
                    "backgroundAlpha": 1,
                    "borderAlpha": 1,
                    "borderColor": "#FFFFFF",
                    "startAlpha": 1,
                    "fontSize": 10,
                    "theme": "none",
                    "chartCursor": {"enabled": true},
                    "graphs": [
                        {
                            "id": "graph2",
                            "bullet": "round",
                            "lineThickness": 3,
                            "bulletSize": 7,
                            "bulletBorderAlpha": 1,
                            "lineColor": "#82E0AA",
                            "bulletColor": "#82E0AA",
                            "useLineColorForBulletBorder": true,
                            "bulletBorderThickness": 3,
                            "fillAlphas": 0,
                            "lineAlpha": 1,
                            "title": chartData,
                            "valueField": valueField,
                            "dashLengthField": "dashLengthLine"
                        }
                    ],
                    "categoryAxis": {
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "inside": true,
                        "tickLength": 0
                    },
                    "valueAxes": [
                        {
                            "id": "ValueAxis-1",
                            "title": "",
                            "axisAlpha": 0,
                            "dashLength": 4,
                            "position": "left"
                        }
                    ]
                }
            );
        }

    }


})();
