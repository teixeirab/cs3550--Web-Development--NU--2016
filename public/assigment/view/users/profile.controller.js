(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService, $rootScope) {
        $scope.message = null;
        $scope.update = update;
        $scope.user = $rootScope.currentUser;

        function update(user){
            $scope.message = null;

            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }

            UserService.updateUser($scope.user._id, user, callback);
            $location.url("/profile");
        }
    }
})();