(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController(FormService, $rootScope, $routeParams) {

        var vm = this;
        var formId = $routeParams.formId;
        vm.forms = [];
        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;

        function init() {
            FormService
                .findAllFormsForUser($rootScope.currentUser._id)
                .then(function (response){
                    if(response.data) {
                        vm.forms = response.data;
                    }
                })
        }
        init();

        function addForm(form){
            FormService
                .createFormForUser(form, $rootScope.currentUser._id)
                .then(function (response){
                    if(response.data) {
                        vm.forms = response.data;
                    }
                })
        }

        function updateForm(form){
            FormService
                .updateFormById(form._id, form)
                .then(function(response){
                    if(response.data) {
                        vm.forms = response.data;
                    }
                });
        }

        function deleteForm(form){
            FormService
                .deleteFormById(form._id)
                .then(function(response){
                    if(response.data) {
                        vm.forms = response.data;
                    }
                });
        }

        function selectForm(index){
            vm.form = vm.forms[index];
        }
    }
})();
