(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope, $location) {
        $scope.$location = $location;
    }
})();
