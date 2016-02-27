(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login(user) {
            var callback = function(response) {
                if (response) {
                    $rootScope.currentUser = response;
                    UserService.setCurrentUser(response);
                    $location.url("/profile");
                }
                if (response == null) {
                    $scope.message = "Username or Password Incorrect";
                }
            };
            UserService.findUserByCredentials(user.username, user.password, callback)
        }
    }
})();