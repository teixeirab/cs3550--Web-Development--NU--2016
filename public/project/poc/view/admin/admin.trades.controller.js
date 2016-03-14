(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminTradesController", AdminTradesController);

    function AdminTradesController($scope, UserService, $location, $rootScope) {
        $scope.users = UserService.users;
    }
})();
