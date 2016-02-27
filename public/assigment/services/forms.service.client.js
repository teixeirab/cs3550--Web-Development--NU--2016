(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope) {
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "011", "title": "ToDo1",     "userId": 123},
                {"_id": "012", "title": "ToDo2",     "userId": 123},
                {"_id": "013", "title": "ToDo3",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234},
                {"_id": "021", "title": "CDs1",      "userId": 234},
                {"_id": "022", "title": "CDs2",      "userId": 234},
                {"_id": "023", "title": "CDs3",      "userId": 234},
            ],

            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };
        return model;

        function createFormForUser(userId, form, callback){
            var newForm = {
                _id: (new Date).getTime(),
                title: form.title,
                userId: userId
            };
            model.forms.push(newForm);
            callback();
        }

        function findAllFormsForUser(userId, callback){
            var userForms = [];
            for (var f in model.forms) {
                if (model.forms[f].userId === userId) {
                    userForms.push(model.forms[f]);
                }
                callback(userForms);
            }
        }

        function deleteFormById(formId, callback){
            for (var f in model.forms) {
                if (model.forms[f]._id === formId) {
                    model.forms.splice(f, 1);
                }
                callback(model.forms);
            }
        }

        function updateFormById(formId, newForm, callback){

            for (var f in model.forms) {
                if (model.forms[f]._id === formId) {
                    model.forms[f] = newForm;
                }
                callback();
            }

        }
    }
})();

