(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("AdminUsersController", AdminUsersController);

    function AdminUsersController($scope, UserService, $rootScope) {
        $scope.users = UserService.users;
        $scope.addUser = addUser;
        $scope.deleteUser = deleteUser;
        $scope.updateUser = deleteUser;

        function renderUsers(){
            var callback = function (response){
                $scope.users = response;
            };
        }

        renderUsers();

        function addUser(form){
            FormService.createFormForUser($rootScope.currentUser._id, form, renderForms)
        }

        function updateUser(form){
            FormService.updateFormById(form._id, form, renderForms);
            $scope.form = null;
        }

        function deleteUser(form){
            UserService.deleteUserById(findUserByName(user.username), renderUsers());
        }

        function selectUser(index){
            $scope.user = $scope.forms[index];
        }

    }
})();
