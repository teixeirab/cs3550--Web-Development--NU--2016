(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .config(function($routeProvider, $httpProvider) {
            $routeProvider
                .when("/home", {
                    templateUrl: "view/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model"
                })
                .when("/search/:text", {
                    templateUrl: "view/search/search.view.html",
                    controller: "SearchController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/admin/users", {
                    templateUrl: "view/admin/admin.users.view.html",
                    controller: "AdminUsersController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when("/admin/companies", {
                    templateUrl: "view/admin/admin.companies.view.html",
                    controller: "AdminCompaniesController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when("/admin/portfolios", {
                    templateUrl: "view/admin/admin.portfolios.view.html",
                    controller: "AdminPortfoliosController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when("/admin/games", {
                    templateUrl: "view/admin/admin.games.view.html",
                    controller: "AdminGamesController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when("/login", {
                    templateUrl: "view/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"

                })
                .when("/profile/:username", {
                    templateUrl: "view/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/register", {
                    templateUrl: "view/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/manage", {
                    templateUrl: "view/games/manage.view.html",
                    controller: "ManageController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/ranking/:username", {
                    templateUrl: "view/games/ranking.view.html",
                    controller: "RankingController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/portfolio", {
                    templateUrl: "view/investing/portfolio.view.html",
                    controller: "PortfolioController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/trading", {
                    templateUrl: "view/investing/trading.view.html",
                    controller: "TradingController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/companies/:identifier/:turn/:generatedName", {
                    templateUrl: "view/analysis/company.view.html",
                    controller: "CompanyController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/companies/:identifier/:turn/:generatedName/momentum", {
                    templateUrl: "view/analysis/momentum.view.html",
                    controller: "MomentumController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/companies/:identifier/:turn/:generatedName/smt", {
                    templateUrl: "view/analysis/smt.view.html",
                    controller: "SmtController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/companies/:identifier/:turn/:generatedName/reports", {
                    templateUrl: "view/analysis/reports.view.html",
                    controller: "ReportsController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/companies/:identifier/:turn/:generatedName/valuation", {
                    templateUrl: "view/analysis/valuation.view.html",
                    controller: "ValuationController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {

        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.role === 'admin')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                console.log(user + "could not log in");
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

})();