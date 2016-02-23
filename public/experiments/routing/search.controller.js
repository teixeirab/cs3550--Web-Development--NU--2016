(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http){
        $scope.search = search;

        function search(title) {
            console.log(title)
            $http.get("http://www.omdbapi.com/?s=" + title)
                .success(render);

        }

        function render(response) {
            $scope.data = response;
        }
    }
})();
