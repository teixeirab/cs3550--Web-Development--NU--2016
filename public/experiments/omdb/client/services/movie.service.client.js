(function(){
    angular
        .module("OmdbApp")
        .factory("MovieService", movieService);

    function movieService($http) {
        var api = {
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes
        };
        return api;

        function findUserLikes (imdbID) {
            return $http.get("/api/movie/"+imdbID+"/user");
        }

        function userLikesMovie(userId, movie) {
            return $http.post("/api/user/"+userId+"/movie/"+movie.imdbID, movie);
        }
    }
})();