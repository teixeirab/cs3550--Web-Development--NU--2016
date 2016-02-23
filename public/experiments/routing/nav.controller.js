(function(){
    angular
        .module("MovieApp")
        .controller("NavController", navController);
    function navController($location, $scope){
        $scope.$location = $location;
    }

})();