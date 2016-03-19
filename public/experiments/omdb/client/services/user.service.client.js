(function(){
    angular
        .module("OmdbApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            register: register,
            logout: logout,
            getProfile: getProfile
        };
        return api;

        function getProfile() {
            return $http.get("/api/omdb/profile/"+$rootScope.currentUser._id);
        }

        function register(user) {
            return $http.post("/api/omdb/register", user);
        }

        function logout() {
            return $http.post("/api/omdb/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/omdb/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function login(credentials) {
            return $http.post("/api/omdb/login", credentials);
        }
    }
})();