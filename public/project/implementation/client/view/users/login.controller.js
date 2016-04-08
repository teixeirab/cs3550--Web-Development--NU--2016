(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $location, $rootScope, cssInjector) {
        var vm = this;

        vm.login = login;

        $('head').append('<link rel="stylesheet" type="text/css" href="assets/css/light-bootstrap-dashboard.css">');

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