module.exports = function(app, formModel) {

    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field", updateField);
    app.get("/api/assignment/field/:fieldType", getFieldTemplateType);

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = formModel.getFieldsForForm(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getFieldTemplateType(req, res) {
        var fieldType = req.params.fieldType;
        var field = formModel.getFieldTemplateType(fieldType);
        res.json(field);
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.getFieldForForm(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteFieldFromForm(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = formModel.deleteFieldFromForm(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        var forms = formModel.createFieldForForm(formId, fields)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        var forms = formModel.updateField(formId, fields)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
};