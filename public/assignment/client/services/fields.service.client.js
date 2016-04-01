(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldsService", FieldsService);

    function FieldsService($http) {

        var api = {
            deleteFieldForForm: deleteFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            createFieldForForm: createFieldForForm,
            updateField: updateField,
            getFieldTemplateType: getFieldTemplateType
        };

        return api;

        function deleteFieldForForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function getFieldTemplateType(fieldType) {
            return $http.get("/api/assignment/field/" + fieldType);
        }

        function createFieldForForm(formId, fields) {
            return $http.post("/api/assignment/form/" + formId + "/field", fields);
        }

        function updateField(formId, fields) {
            return $http.put("/api/assignment/form/" + formId + "/field", fields);
        }
    }
})();