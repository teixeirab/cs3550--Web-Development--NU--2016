(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, FormService, UserService) {
        currentUser = UserService.getCurrentUser();
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;

        function renderForms(response){
            $scope.form = response;
        }

        FormService.findAllFormsForUser(currentUser._id, renderForms);

        function addForm(form){
            FormService.createFormForUser(currentUser._id, form, renderForms)
        }

        function updateForm(form){
            FormService.updateFormById(formId, newForm, renderForms)
        }

        function deleteForm(form){
            FormService.deleteFormById(form, renderForms);
        }

        function selectForm(form){

        }
    }
})();
