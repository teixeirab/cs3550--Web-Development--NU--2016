(function() {
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider, $httpProvider) {
            $routeProvider
                .when("/home",{
                    templateUrl: "view/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model"
                })
                .when("/admin",{
                    templateUrl: "view/admin/admin.users.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        loggedin : checkAdmin
                    }
                })
                .when("/admin/forms",{
                    templateUrl: "view/admin/admin.forms.view.html",
                    controller: "AdminFormsController",
                    controllerAs: "model",
                    resolve: {
                        loggedin : checkAdmin
                    }
                })
                .when("/forms",{
                    templateUrl: "view/forms/forms.view.html",
                    controller: "FormsController",
                    controllerAs: "model",
                    resolve: {
                        loggedin : checkLoggedin
                    }

                })
                .when("/fields",{
                    templateUrl: "view/forms/fields.view.html",
                    controller: "FieldsController",
                    controllerAs: "model",
                    resolve: {
                        loggedin : checkLoggedin
                    }
                })
                .when("/login",{
                    templateUrl: "view/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/profile",{
                    templateUrl: "view/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        loggedin : checkLoggedin
                    }
                })
                .when("/forms/:formId/field", {
                    templateUrl: "view/forms/fields.view.html",
                    controller: "FieldsController",
                    controllerAs: "model",
                    resolve: {
                        loggedin : checkLoggedin
                    }
                })
                .when("/register",{
                    templateUrl: "view/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles === 'admin')
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

        $http.get('/api/assignment/loggedin').success(function(user)
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

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };


})();