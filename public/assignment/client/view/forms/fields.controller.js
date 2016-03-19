(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldsService, $uibModal, $rootScope , $routeParams, $scope) {
        var vm = this;
        var formId = $routeParams.formId;
        //Couldnt get sorting to work on time
        //$scope.list = tmpList;
        //$scope.sortingLog = [];

        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.editField = editField;

        function init() {
            if (formId == null) {
                console.log($routeParams.formId);
            }
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

        var tmpList = [];

        for (var i = 1; i <= 6; i++){
            tmpList.push({
                text: 'Item ' + i,
                value: i
            });
        }



        $scope.sortableOptions = {
            update: function(e, ui) {
                var logEntry = tmpList.map(function(i){
                    return i.value;
                }).join(', ');
                $scope.sortingLog.push('Update: ' + logEntry);
            },
            stop: function(e, ui) {
                // this callback has the changed model
                var logEntry = tmpList.map(function(i){
                    return i.value;
                }).join(', ');
                $scope.sortingLog.push('Stop: ' + logEntry);
            }
        };

    }
})();
