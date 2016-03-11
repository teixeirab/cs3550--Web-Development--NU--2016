(function () {
    "use strict";
    angular
        .module("SimulyApp")
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
            .when("/create",{
                templateUrl: "view/games/create.view.html",
                controller: "CreateController"
            })
            .when("/manage",{
                templateUrl: "view/games/manage.view.html",
                controller: "ManageController"
            })
            .when("/portfolio",{
                templateUrl: "view/investing/portfolio.view.html",
                controller: "RegisterController"
            })
            .when("/trading",{
                templateUrl: "view/investing/trading.view.html",
                controller: "TradingController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();