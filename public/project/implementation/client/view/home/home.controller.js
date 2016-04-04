(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("HomeController", HomeController);

    function HomeController(UserService, $location, $rootScope) {
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(!user) {
                return;
            }
            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile/" + user.username);
                    }
                });
        }
    }
})();