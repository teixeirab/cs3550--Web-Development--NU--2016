(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsPopupController", FieldsPopupController);

    function FieldsPopupController(FieldsService, $rootScope, $scope, $route, selectedField, formId) {
        $scope.selectedField = selectedField;
        $scope.formId = formId;
        $scope.showPlaceholder = $scope.selectedField.type === 'TEXT' || $scope.selectedField.type === 'TEXTAREA';

        $scope.showTextarea = $scope.selectedField.type === 'OPTIONS' || $scope.selectedField.type === 'CHECKBOXES' ||
            $scope.selectedField.type === 'RADIOS';

        $scope.accept = accept;
        $scope.init = init;
        $scope.cancel = cancel;

        function init() {
            $scope.label = $scope.selectedField.label;

            if ($scope.showTextarea) {
                $scope.textArea = [];
                var options = $scope.selectedField.options;
                for (var i = 0; i < options.length; i++) {
                    $scope.textArea.push(options[i].label + ":" + options[i].value);
                }
                $scope.options = $scope.textArea.join("\n");
            }
        }
        init();

        function cancel() {
            $rootScope.modalInstance.dismiss('cancel');
        }

        function accept() {
            var formOptionsArray = [];
            if ($scope.options) {
                var formOptions = $scope.options.split("\n");
                for (var i in formOptions) {
                    var labelValuePair = formOptions[i].split(":");
                    formOptionsArray.push({
                        label: labelValuePair[0],
                        value: labelValuePair[1]
                    });
                }
            }

            var field = {
                label: $scope.label,
                placeholder: $scope.placeholder,
                options: formOptionsArray.length > 0 ? formOptionsArray : null
            };

            FieldsService
                .updateField($scope.formId, $scope.selectedField._id, field)
                .then(function(response) {
                    FieldsService
                        .getFieldsForForm($scope.formId)
                        .then(function(response) {
                        });
                });
            $route.reload();
            $rootScope.modalInstance.close();
        }
    }
})();
