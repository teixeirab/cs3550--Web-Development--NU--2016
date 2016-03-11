(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminController", adminController);

    function adminController($scope, UserService, $location, $rootScope) {
        $scope.users = UserService.users;
    }
})();
