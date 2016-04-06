(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "view/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/search/:text",{
                templateUrl: "view/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/admin/users",{
                templateUrl: "view/admin/admin.users.view.html",
                controller: "AdminUsersController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/admin/companies",{
                templateUrl: "view/admin/admin.companies.view.html",
                controller: "AdminCompaniesController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/admin/portfolios",{
                templateUrl: "view/admin/admin.portfolios.view.html",
                controller: "AdminPortfoliosController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/admin/games",{
                templateUrl: "view/admin/admin.games.view.html",
                controller: "AdminGamesController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/login",{
                templateUrl: "view/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"

            })
            .when("/profile/:username",{
                templateUrl: "view/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/register",{
                templateUrl: "view/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/create",{
                templateUrl: "view/games/create.view.html",
                controller: "CreateController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/manage",{
                templateUrl: "view/games/manage.view.html",
                controller: "ManageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/portfolio",{
                templateUrl: "view/investing/portfolio.view.html",
                controller: "PortfolioController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/trading",{
                templateUrl: "view/investing/trading.view.html",
                controller: "TradingController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/companies/:companyId/:turn",{
                templateUrl: "view/analysis/company.view.html",
                controller: "CompanyController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/companies/:companyId/:turn/momentum",{
                templateUrl: "view/analysis/momentum.view.html",
                controller: "MomentumController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/companies/:companyId/:turn/smt",{
                templateUrl: "view/analysis/smt.view.html",
                controller: "SmtController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/companies/:companyId/:turn/reports",{
                templateUrl: "view/analysis/reports.view.html",
                controller: "ReportsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/companies/:companyId/:turn/valuation",{
                templateUrl: "view/analysis/valuation.view.html",
                controller: "ValuationController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });

        function checkLoggedIn(UserService, $q, $location) {
            var deferred = $q.defer();

            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        UserService.setCurrentUser(currentUser);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });
            return deferred.promise;
        }
    }
})();