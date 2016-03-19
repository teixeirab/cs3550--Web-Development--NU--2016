module.exports = function(app, formModel, userModel) {

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:formId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    // returns an array of forms belonging to a user whose id is equal to the userId path parameter
    function findAllFormsForUser(req, res){
        var userId = req.params.userId;
        var userForms = formModel.findAllFormsForUser(userId);
        res.json(userForms);
    }

    // returns a form object whose id is equal to the formId path parameter
    function getFormById(req, res){

    }

    // removes a form object whose id is equal to the formId path parameter
    function deleteFormById(req, res){
        var formId = req.params.formId;
        var userForms = formModel.deleteFormById(formId);
        res.json(userForms);
    }

    // creates a new form whose properties are the same as the form object embedded in the HTTP request's body and
    // the form belongs to a user whose id is equal to the userId path parameter. The form object's id is initially
    // null since it is a new record. The id of the new form should be set dynamically using Node.js guid or
    // node-uuid libraries. These will eventually be set by the database when they are inserted into a collection
    function createFormForUser(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var userForms = formModel.createFormForUser(form, formId);
        res.json(userForms);
    }

    // updates a form object whose id is equal to the formId path parameter so that its properties are the same as
    // the property values of the form object embedded in the request's body
    function updateFormById (req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var userForms = formModel.updateFormById(formId, form);
        res.json(userForms);
    }
};
