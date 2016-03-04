(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, FormService, $rootScope) {
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;

        function renderForms(){
            var callback = function (response){
                $scope.forms = response;
            };
            FormService.findAllFormsForUser($rootScope.currentUser._id, callback);
            $scope.form = null;
        }

        renderForms();

        function addForm(form){
            FormService.createFormForUser($rootScope.currentUser._id, form, renderForms)
        }

        function updateForm(form){
            FormService.updateFormById(form._id, form, renderForms);
            $scope.form = null;
        }

        function deleteForm(form){
            FormService.deleteFormById(form._id, renderForms);
        }

        function selectForm(index){
            $scope.form = $scope.forms[index];
        }
    }
})();
