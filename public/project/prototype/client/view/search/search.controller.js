(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("SearchController", SearchController);

    function SearchController($location, $scope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;
        $scope.search = search;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }

        function search(){
            $location.url("/search");
        }
    }
})();
