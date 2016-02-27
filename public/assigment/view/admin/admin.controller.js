(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, UserService, $location, $rootScope) {
        $scope.users = UserService.users;
    }
})();
