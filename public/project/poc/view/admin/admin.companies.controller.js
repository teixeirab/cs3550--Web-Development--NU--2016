(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminCompaniesController", AdminCompaniesController);

    function AdminCompaniesController($scope, InvestingService, $location, $rootScope) {
        $scope.companies = InvestingService.companies;
        $scope.addCompany = addCompany;
        $scope.deleteCompany = deleteCompany;
        $scope.updateCompany = updateCompany;

        function renderCompany(){
            var callback = function (response){
                $scope.companies = response;
            };
        }

        renderCompany();

        function addCompany(company){
            var setCompany = function(response){
                GameService.setCurrentUser(response);
            };

            GameService.createGameForUser();
        }

        function updateCompany(game){
            GameService.updateGame();
        }

        function deleteCompany(game){
            GameService.deleteUserById();
        }

        function selectCompany(index){
            $scope.game = $scope.games[index];
        }

    }
})();
