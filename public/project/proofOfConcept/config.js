(function(){
    angular
        .module("SimulationApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "view/home/home.view.html",
                controller: "HomeController"
            })
            .when("/admin",{
                templateUrl: "view/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/login",{
                templateUrl: "view/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile",{
                templateUrl: "view/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/register",{
                templateUrl: "view/users/register.view.html",
                controller: "RegisterController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();