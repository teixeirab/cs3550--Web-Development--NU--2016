(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController(UserService, $routeParams) {
        var vm = this;
        vm.users = [];
        vm.ascending = true;
        vm.descending = false;
        var userId = $routeParams.userId;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.addUser = addUser;
        vm.sortAscending = sortAscending;
        vm.sortDescending = sortDescending;

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
            vm.user = null;
        }

        function selectUser(index){
            vm.user = vm.users[index];
        }

        function addUser(user){
            UserService
                .addUser(user)
                .then(function(response){
                    init();
                });
        }

        function sortAscending(field){
            if (field === "username"){
                vm.users = vm.users.sort(function(a, b){
                    return a.username > b.username;
                });
            }
            if (field === "id"){
                vm.users = vm.users.sort(function(a, b){
                    return a._id > b._id;
                });
            }
            if (field === "lastName"){
                vm.users = vm.users.sort(function(a, b){
                    return a.lastName > b.lastName;
                });
            }
            if (field === "firstName"){
                vm.users = vm.users.sort(function(a, b){
                    return a.firstName > b.firstName;
                });
            }
            if (field === "roles"){
                vm.users = vm.users.sort(function(a, b){
                    return a.roles > b.roles;
                });
            }
            vm.ascending = false;
            vm.descending = true;
        }

        function sortDescending(field){
            if (field === "username"){
                vm.users = vm.users.sort(function(a, b){
                    return a.username < b.username;
                });
            }
            if (field === "id"){
                vm.users = vm.users.sort(function(a, b){
                    return a._id < b._id;
                });
            }
            if (field === "lastName"){
                vm.users = vm.users.sort(function(a, b){
                    return a.lastName < b.lastName;
                });
            }
            if (field === "firstName"){
                vm.users = vm.users.sort(function(a, b){
                    return a.firstName < b.firstName;
                });
            }
            if (field === "roles"){
                vm.users = vm.users.sort(function(a, b){
                    return a.roles < b.roles;
                });
            }
            vm.ascending = true;
            vm.descending = false;
        }
    }
})();