(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminUsersController", AdminUsersController);

    function AdminUsersController($scope, UserService, $rootScope) {
        $scope.users = UserService.users;
        $scope.addUser = addUser;
        $scope.deleteUser = deleteUser;
        $scope.updateUser = updateUser;

        function renderUsers(){
            var callback = function (response){
                $scope.users = response;
            };
        }

        renderUsers();

        function addUser(user){
            var setUser = function(response){
                UserService.setCurrentUser(response);
            };

            UserService.createUser(user, setUser);
        }

        function updateUser(user){
            UserService.updateUser(UserService.findUserByName(user.username)._id, user, renderUsers());
        }

        function deleteUser(user){
            UserService.deleteUserById(UserService.findUserByName(user.username)._id, renderUsers());
        }

        function selectUser(index){
            $scope.user = $scope.users[index];
        }

    }
})();
