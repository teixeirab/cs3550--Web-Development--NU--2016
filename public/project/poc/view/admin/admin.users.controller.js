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
        $scope.selectUser = selectUser;

        function init() {
            var callback = function (response) {
                $scope.users = response;
            };
            UserService.findAllUsers(callback)
        }

        init();

        function addUser(user) {
            UserService.createUser(user, init);
        }

        function updateUser(user) {
            UserService.updateUser(user._id,user, init);
            $scope.user = null;
        }

        function selectUser(uIndex) {
            $scope.user = $scope.users[uIndex];
        }

        function deleteUser(user){
            console.log(user.username);
            UserService.deleteUserByUsername(user.username, init);
        }
    }
})();
