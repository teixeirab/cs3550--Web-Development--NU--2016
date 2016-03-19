(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
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
            deleteUser : deleteUser
        };
        return api;

        function getProfile() {
            return $http.get("/api/assignment/profile/"+$rootScope.currentUser._id);
        }

        function getUsers() {
            return $http.get("/api/assignment/user");
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function setUsers(users) {
            $rootScope.currentUsers = users;
        }

        function login(credentials) {
            return $http.post("/api/assignment/login", credentials);
        }

        function update(user, userId){
            return $http.put("/api/assignment/user/"+ userId, user);
        }

        function deleteUser(userId){
            return $http.delete("/api/assignment/user/" + userId);
        }

    }
})();


