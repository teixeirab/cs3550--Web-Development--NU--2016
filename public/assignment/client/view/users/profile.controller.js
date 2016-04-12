(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService, $scope) {
        var vm = this;
        vm.update = update;
        vm.currentUser = $rootScope.currentUser;

        function update(user){
            UserService
                .update(user, user._id)
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                    }

                },
                    function(err){
                        $scope.error = err;
                    }
                );
        }
    }
})();