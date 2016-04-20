(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService, GameService,  $routeParams) {
        var vm = this;
        vm.update = update;
        vm.currentUser = $rootScope.currentUser;

        function init() {
            if (vm.currentUser.role === 'player'){
                GameService
                    .findGameUserIsIn(vm.currentUser.username)
                    .then(function(response){
                        if (response.data.length > 0){
                            vm.currentGame = response.data[0];
                            GameService.setCurrentGame(vm.currentGame);
                            console.log("fshit")
                            $rootScope.$broadcast('new-game', vm.currentGame.title)
                        }
                        else {
                            $rootScope.$broadcast('game-over');
                            $rootScope.$broadcast('game-out');
                        }
                    });
            }
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