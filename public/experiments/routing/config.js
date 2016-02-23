/**
 * Created by becogontijo on 2/18/2016.
 */
/**
 * Created by becogontijo on 2/18/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .config(Configuration);

    function Configuration($routeProvider){
        $routeProvider
            .when ("/home", {
                templateUrl: "home.view.html",
                controller: "HomeController"
            })
            .when ("/search", {
                templateUrl: "search.view.html",
                controller: "SearchController"
            })
            .when ("/details/:imdbID", {
                templateUrl: "details.view.html",
                controller: "DetailsController"
            })

            .otherwise({
                redirectTo: "/home"
            })
    }
})();