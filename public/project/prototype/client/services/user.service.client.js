(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            register: register,
            logout: logout,
            getProfile: getProfile,
            update: update,
            getUsers: getUsers,
            setUsers : setUsers,
            deleteUser : deleteUser,
            addUser: addUser,
        };
        return api;

        function getProfile() {
            return $http.get("/api/project/profile/"+$rootScope.currentUser._id);
        }

        function getUsers() {
            return $http.get("/api/project/user");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function addUser(user) {
            return $http.post("/api/project/add", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function setUsers(users) {
            $rootScope.currentUsers = users;
        }

        function login(credentials) {
            return $http.post("/api/project/login", credentials);
        }

        function update(user, userId){
            return $http.put("/api/project/user/"+ userId, user);
        }

        function deleteUser(userId){
            return $http.delete("/api/project/user/" + userId);
        }

    }
})();


