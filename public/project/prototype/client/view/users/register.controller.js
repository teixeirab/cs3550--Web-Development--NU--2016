(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.message = null;
        vm.register = register;

        function init() {
        }
        init();

        function register(user) {
            vm.message = null;

            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                vm.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                vm.message = "Passwords must match";
                return;
            }

            if (user.type1 && user.type2) {
                vm.message = "A user can only either join or create a games, please choose only one";
                return;
            }

            if (user.role === null) {
                vm.message = "Please choose the role of the user";
                return;
            }

            if (user.type1) {
                vm.user.role = "admin"
            }

            if (user.type2) {
                vm.user.role = "player"
            }

            UserService
                .register(user)
                .then(function (response) {
                    var currentUser = response.data;
                    if (currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }
    }
})();
