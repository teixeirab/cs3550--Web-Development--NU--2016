(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, $location) {
        $scope.$location = $location;
    }
})();
