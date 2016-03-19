(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, UserService, $rootScope) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.addUser = addUser;

        function init() {
            UserService
                .getUsers()
                .then(function (response){
                    if(response.data) {
                        UserService.setUsers(response.data);
                        $scope.users = response.data
                    }
                })
        }
        init();

        function deleteUser(){

        }

        function updateUser(){

        }

        function selectUser(){

        }

        function addUser(){

        }
    }
})();
