(function(){
    angular
        .module("LoginExample")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home.view.html"
            })
            .when("/register", {
                templateUrl: "register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "admin.users.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();