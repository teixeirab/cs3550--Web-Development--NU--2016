(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService, GameService) {
        var vm = this;
        vm.message = null;
        vm.register = register;

        function init() {
        }
        init();

        function register(user) {
            console.log(user);
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

            if (user.type) {
                vm.user.role = "admin"
            }

            if (user.type === "player"){
                GameService
                    .addUserInGame(user, user.gmae_name)
                    .then(function (response) {
                        var currentGame = response.data;
                        if (currentUser === null) {
                            vm.message = "Game not found, select another one"
                        }
                    });
            }

            UserService
                .register(user)
                .then(function (response) {
                    var currentUser = response.data;
                    if (currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile/" + user.username);
                    }
                });

        }
    }
})();
