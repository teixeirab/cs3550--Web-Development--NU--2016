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
            createLineGraph: createLineGraph
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
                            "title": "",
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
                    "theme": "light",
                    "marginTop":0,
                    "marginRight": 0,
                    "dataProvider": chartData,
                    "categoryField": "periods",
                    "valueAxes": [
                        {
                            "id": "ValueAxis-1",
                            "title": "",
                            "axisAlpha": 0,
                            "dashLength": 4,
                            "position": "left"
                        }
                    ],
                    "categoryAxis": {
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "inside": true,
                        "tickLength": 0
                    },
                    "graphs": [{
                        "id":"g1",
                        "bullet": "round",
                        "bulletSize": 8,
                        "lineColor": "#d1655d",
                        "lineThickness": 2,
                        "negativeLineColor": "#637bb6",
                        "type": "smoothedLine",
                        "valueField": valueField
                    }],
                    "chartCursor": {
                        "cursorAlpha": 0,
                        "valueLineEnabled":true,
                        "valueLineBalloonEnabled":true,
                        "valueLineAlpha":0.5,
                        "fullWidth":true
                    }
                }
            );
        }

    }


})();
