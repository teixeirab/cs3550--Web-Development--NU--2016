(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService, $routeParams) {
        var vm = this;
        vm.update = update;
        vm.currentUser = $rootScope.currentUser;
        var username = $routeParams.username;


        function init() {
            UserService.getUsers();
        }
        return init();


        function update(user){
            UserService
                .update(user, vm.currentUser._id)
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                    }
                });
        }
    }
})();