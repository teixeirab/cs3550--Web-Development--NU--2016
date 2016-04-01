(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
        var api = {
            findAllFormsForUser : findAllFormsForUser,
            getFormById : getFormById,
            createFormForUser : createFormForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById,
            findAllForms : findAllForms
        };
        return api;

        function findAllForms (){
            return $http.get("/api/assignment/forms")
        }

        // returns an array of forms belonging to a user whose id is equal to the userId path parameter
        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form")
        }

        // returns a form object whose id is equal to the formId path parameter
        function getFormById(formId){
            return $http.get("/api/assignment/form/" + formId)
        }

        // removes a form object whose id is equal to the formId path parameter
        function deleteFormById(userId){
            return $http.delete("/api/assignment/form/" + userId)
        }

        // creates a new form whose properties are the same as the form object embedded in the HTTP request's body and
        // the form belongs to a user whose id is equal to the userId path parameter. The form object's id is initially
        // null since it is a new record. The id of the new form should be set dynamically using Node.js guid or
        // node-uuid libraries. These will eventually be set by the database when they are inserted into a collection
        function createFormForUser (form, userId){
            return $http.post("/api/assignment/user/" + userId + "/form", form)
        }

        // updates a form object whose id is equal to the formId path parameter so that its properties are the same as
        // the property values of the form object embedded in the request's body
        function updateFormById (formId, form) {
            return $http.put("/api/assignment/form/" + formId, form);
        }
    }
})();

