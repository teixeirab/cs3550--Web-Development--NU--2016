(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, $scope, UserService, $rootScope) {
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;

            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }

            var checkExistence = function(response) {
                if (response != null) {
                    $scope.message = "User already exists";
                }
            };

            UserService.findUserByUsername(user.username, checkExistence);

            var setUser = function(response){
                UserService.setCurrentUser(response);
            };

            UserService.createUser($scope.user, setUser);

            $location.url("/profile");
        }
    }
})();
