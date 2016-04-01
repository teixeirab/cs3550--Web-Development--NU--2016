(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController(UserService, $routeParams) {
        var vm = this;
        vm.users = [];
        var userId = $routeParams.userId;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.addUser = addUser;

        function init() {
            UserService
                .getUsers()
                .then(function (response){
                    if(response.data) {
                        vm.users = response.data;
                    }
                });
        }

        init();


        function deleteUser(user){
            UserService
                .deleteUser(user._id)
                .then(function(){
                    init();
                });
        }

        function updateUser(user){
            UserService
                .update(user, user._id)
                .then(function(){
                    init();
                });
        }

        function selectUser(index){
            vm.user = vm.users[index];
        }

        function addUser(user){
            UserService
                .register(user)
                .then(function(response){
                    init();
                });
        }
    }
})();