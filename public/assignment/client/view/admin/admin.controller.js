(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, UserService, $rootScope) {
        var vm = this;
        vm.deleteField = deleteField;

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


    }
})();
