(function () {
    "use strict";
    angular
        .module("SimulyApp")
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

            if (user.type1 && user.type2) {
                $scope.message = "A user can only either join or create a games, please choose only one";
                return;
            }

            if (user.role === null) {
                $scope.message = "Please choose the role of the user";
                return;
            }

            if(user.type1) {
                $scope.user.role = "admin"
            }

            if(user.type2) {
                $scope.user.role = "player"
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

            UserService.createForm($scope.user, setUser);

            $location.url("/profile");
        }
    }
})();
