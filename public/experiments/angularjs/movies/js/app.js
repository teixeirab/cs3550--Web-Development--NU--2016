(function(){
    angular
        .module("MovieAdminApp", [])
        .controller("MovieListController", MovieListController);


    function MovieListController($scope){
        $scope.movies = [
            {id: 123, title: "Star Wars", director: "JJ Abrams"},
            {id: 124, title: "Aliens", director: "JJ"},
            {id: 125, title: "Lol", director: "Abrams"}
        ];

        $scope.addMovie = function(){
            var newMovie = {
                id : $scope.movie.id,
                title: $scope.movie.title,
                director: $scope.movie.director
            };
            $scope.movies.push(newMovie);
        }

        $scope.deleteMovie = function(movie){
            var index = $scope.movies.indexOf(movie);

            $scope.movies.splice(index, 1);
        }

        $scope.selectMovie = function(movie){
            console.log(movie);
            $scope.movie = {
                id : movie.id,
                title: movie.title,
                director: movie.director
            }
        }

        $scope.updateMovie = function(movie){
            
        }
    }




})();
