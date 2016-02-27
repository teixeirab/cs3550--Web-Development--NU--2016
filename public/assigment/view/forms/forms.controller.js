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

        function renderUserForm(){
            FormService.findAllFormsForUser(currentUser._id, renderForms);
        }

        renderUserForm();

        function addForm(form){
            FormService.createFormForUser(currentUser._id, form, renderUserForm)
        }

        function updateForm(form){
            FormService.updateFormById(formId, newForm, renderUserForm)
        }

        function deleteForm(form){
            console.log(form._id);
            FormService.deleteFormById(form._id, renderUserForm);
        }

        function selectForm(form){

        }
    }
})();
