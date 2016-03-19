(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldsService, $uibModal, $rootScope , $routeParams) {
        var vm = this;
        var formId = $routeParams.formId;

        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.editField = editField;
        vm.duplicateField = duplicateField;

        function init() {
            var formId = $routeParams.formId;
            FieldsService
                .getFieldsForForm(formId)
                .then(function(response) {
                    if (response.data) {
                        vm.fields = response.data;
                    }
                });
        }
        init();

        function deleteField(field) {
            FieldsService
                .deleteFieldForForm(formId, field._id)
                .then(function(response) {
                    if (response.data) {
                        vm.fields = response.data;
                    }
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
                        FieldsService
                            .createFieldForForm(formId, field)
                            .then(function(response) {
                                if (response.data) {
                                    vm.fields = response.data;
                                }
                            });
                    }
                });
        }

        function duplicateField(field) {
            FieldsService
                .createFieldForForm(formId, field)
                .then(function(response) {
                    if (response.data) {
                        vm.fields = response.data;
                    }
                });
        }

    }
})();
