(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("HomeController", HomeController)
        .config(function(cssInjectorProvider){
            cssInjectorProvider.setSinglePageMode(true);
        });

    function HomeController(UserService, $location, $rootScope, $scope, cssInjector) {
        var vm = this;
        vm.login = login;

        cssInjector.removeAll();
        cssInjector.add("assets/css/main.css");

        $('link[rel=stylesheet][href~="assets/css/light-bootstrap-dashboard.css"]').remove();

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