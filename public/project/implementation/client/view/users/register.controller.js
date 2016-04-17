(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService, GameService, PortfolioService, $scope) {

        $('head').append('<link rel="stylesheet" type="text/css" href="assets/css/light-bootstrap-dashboard.css">');

        var vm = this;
        $scope.message = null;
        vm.register = register;

        function init() {
            GameService
                .findAllOpenGames()
                .then(function (response){
                    if(response.data) {
                        vm.games = response.data
                    }
                })
        }
        init();

        function registerUser(user){
            UserService
                .register(user)
                .then(function (response) {
                    var currentUser = response.data;
                    if (currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile/" + user.username);
                    }
                });
        }

        function createPortfolio(newPortfolio, user){
            PortfolioService
                .createPortfolio(newPortfolio)
                .then(function (response) {
                    if (response.data) {
                        registerUser(user)
                    }
                    else {
                        $scope.message = "We were unable to create this portfolio";
                    }
                });
        }

        function checkForErrors(user){
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
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            if (user.role === null) {
                $scope.message = "Please choose the role of the user";
                return;
            }
        }

        function checkGameOpen(gameName){
            var result = false;
            for (var i = 0; i < vm.games.length; i++){
                if (gameName === vm.games[i].title){
                    result = true;
                }
            }
            return result;
        }

        function register(user) {
            $scope.message = null;
            checkForErrors(user);

            if (user.role === "player"){
                if (checkGameOpen(user.gameName)){
                    var newPortfolio = {
                        username: user.username,
                        gameName : user.gameName,
                        holdings : [],
                        cash_remaining : 1000,
                        currentTurn : 1
                    };

                    GameService
                        .addUserInGame(user.username, user.gameName)
                        .then(function (response) {
                            if (response.data) {
                                createPortfolio(newPortfolio, user)
                            }
                            else {
                                $scope.message = "Game not found, select another one"
                            }
                        });
                }
                else {
                    $scope.message = "Game selected is unavailable, select another one"
                }
            }

            if (user.role === "admin"){
                var newGame = {
                    title: vm.game.title,
                    userId: vm.user.username,
                    players: [],
                    duration: 10,
                    universe: 10
                };
                GameService
                    .createGame(newGame)
                    .then(function (response) {
                        if (response.data === null) {
                            $scope.message = "Please select a different game name"
                        }
                        else {
                            registerUser(user)
                        }
                    });
            }
        }
    }
})();
