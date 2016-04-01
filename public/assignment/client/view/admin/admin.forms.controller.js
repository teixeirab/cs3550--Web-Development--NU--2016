(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminFormsController", adminFormsController);

    function adminFormsController(FormService, $routeParams) {
        var vm = this;
        vm.forms = [];
        vm.deleteForm = deleteForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;
        vm.addForm = addForm;

        function init() {
            FormService
                .findAllForms()
                .then(function (response){
                    if(response.data) {
                        vm.forms = response.data;
                    }
                });
        }

        init();

        function deleteForm(form){
            FormService
                .deleteFormById(form._id)
                .then(function(){
                    init();
                });
        }

        function updateForm(form){
            FormService
                .updateFormById(form._id, form)
                .then(function(){
                    init();
                });
        }

        function selectForm(index){
            vm.form = vm.forms[index];
        }

        function addForm(form){
            FormService
                .createFormForUser(form, form.userId)
                .then(function(){
                    init();
                });
        }
    }
})();