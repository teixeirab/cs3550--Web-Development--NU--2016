(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            var user = UserService.findUserByCredentials(user.username, user.password);
            if (user) {
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }
})();