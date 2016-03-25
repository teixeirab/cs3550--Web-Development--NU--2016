(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("HeaderController", headerController);

    function headerController($location, $scope, UserService, $rootScope) {
        $scope.$location = $location;
        $scope.logout = logout;
        $scope.search = search;

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
