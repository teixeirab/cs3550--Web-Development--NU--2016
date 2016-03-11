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
            .when("/summary",{
                templateUrl: "view/analysis/company.view.html",
                controller: "CompanyController"
            })
            .when("/momentum",{
                templateUrl: "view/analysis/momentum.view.html",
                controller: "MomentumController"
            })
            .when("/smt",{
                templateUrl: "view/analysis/smt.view.html",
                controller: "SmtController"
            })
            .when("/reports",{
                templateUrl: "view/analysis/reports.view.html",
                controller: "ReportsController"
            })
            .when("/valuation",{
                templateUrl: "view/analysis/valuation.view.html",
                controller: "ValuationController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();