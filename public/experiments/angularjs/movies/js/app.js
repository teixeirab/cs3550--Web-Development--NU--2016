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

        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        function addMovie(movie){
            var newMovie = {
                id : movie.id,
                title: movie.title,
                director: movie.director
            };
            $scope.movies.push(newMovie);
        }

        function deleteMovie (index){
            $scope.movie.splice(index, 1);
        }

        function selectMovie (movie){
            console.log(movie);

        }

         function updateMovie(movie){

        }
    }




})();
