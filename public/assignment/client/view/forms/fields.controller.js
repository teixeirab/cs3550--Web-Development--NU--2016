(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldsService, $uibModal, $rootScope , $routeParams, FormService) {
        var vm = this;
        var formId = $routeParams.formId;

        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.editField = editField;

        function init() {
            if (formId == null) {
            }
            var formId = $routeParams.formId;

            FormService
                .getFormById(formId)
                .then(function(response) {
                    if(response.data){
                        vm.form = response.data
                    }
                });

            FieldsService
                .getFieldsForForm(formId)
                .then(function(response) {
                    if (response.data) {
                        vm.fields = response.data;
                        $rootScope.fields = response.data;
                    }
                });
        }
        init();

        function deleteField(field) {
            FieldsService
                .deleteFieldForForm(formId, field._id)
                .then(function() {
                    init();
                });
        }

        function editField(index) {
            $rootScope.modalInstance = $uibModal.open({
                templateUrl: 'view/forms/fields.popup.view.html',
                controller: 'FieldsPopupController',
                size: 'lg',
                resolve: {
                    selectedField: function () {
                        return vm.fields[index];
                    },
                    formId: function() {
                        return formId;
                    }
                }
            });
        }

        function addField(type) {
            FieldsService
                .getFieldTemplateType(type)
                .then(function(response) {
                    if (response.data) {
                        var field = response.data;
                        $rootScope.fields.push(field);

                        FieldsService
                            .createFieldForForm(formId, $rootScope.fields)
                            .then(function(response) {
                                if (response.data) {
                                    vm.fields = $rootScope.fields;
                                }
                            });
                    }
                });
        }
    }
})();
