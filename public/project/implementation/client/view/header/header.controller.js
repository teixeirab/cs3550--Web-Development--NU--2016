(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("HeaderController", headerController);

    function headerController($location, $scope, UserService, $rootScope) {
        $scope.$location = $location;
        $scope.logout = logout;
        $scope.search = search;

        $scope.$on('company', function(event, data){
            $scope.identifier = data.identifier;
            $scope.turn = data.turn;
            $scope.generated_name = data.generated_name;
            $scope.portfolioId = data.portfolioId
        });

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }

        function search(searchText){
            if ($rootScope.currentUser.roles = 'admin'){
                $scope.searchText = "";
                $location.url("/search/" + searchText)
            }
        }
    }
})();
