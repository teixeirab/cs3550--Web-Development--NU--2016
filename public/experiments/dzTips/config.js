(function () {
    "use strict";
    angular
        .module("DZtipsApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "view/home/home.view.html",
                controller: "HomeController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();