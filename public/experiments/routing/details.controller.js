/**
 * Created by becogontijo on 2/18/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("DetailsController", detailsController)

    function detailsController($scope, $routeParams, $http){
        $scope.imdbID = $routeParams.imdbID;

        $http.get("http://www.omdbapi.com/?i=" + $scope.imdbID)
            .success(render);

        function render(response){
            $scope.movie = response;
        }
    }


})();