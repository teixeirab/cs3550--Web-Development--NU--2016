(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminCompaniesController", AdminCompaniesController);

    function AdminCompaniesController($scope, UserService, $location, $rootScope) {
        $scope.users = UserService.users;
    }
})();
