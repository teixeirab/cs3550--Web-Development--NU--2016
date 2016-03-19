(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var vm = this;
        vm.update = update;
        vm.currentUser = $rootScope.currentUser;


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