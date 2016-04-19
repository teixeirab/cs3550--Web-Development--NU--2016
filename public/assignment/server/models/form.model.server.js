// load q promise library
var q = require("q");
var templates = require("./field.mock.json");

module.exports = function(db, mongoose) {

    // load form and fields schema
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    // create form model from schema
    var FormModel = mongoose.model('Form', FormSchema);
    var FieldModel = mongoose.model('Field', FieldSchema);

    var api = {
        // Forms Service
        findAllFormsForUser: findAllFormsForUser,
        createFormForUser : createFormForUser,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,
        findAllForms : findAllForms,
        getFormById : getFormById,
        // Fields Service
        getFieldsForForm : getFieldsForForm,
        getFieldForForm : getFieldForForm,
        deleteFieldFromForm : deleteFieldFromForm,
        getFieldTemplateType : getFieldTemplate,
        updateField : updateField,
        createFieldForForm: createFieldForForm,
    };
    return api;


    //FORMS
    function getFormById (formId){
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findAllForms (){
        var deferred = q.defer();
        FormModel.find('Form', function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findAllFormsForUser(userId){
        var deferred = q.defer();
        FormModel.find({userId: userId}, function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function createFormForUser(form, userId){

        var newForm = {
            title : form.title,
            userId : userId,
            fields : templates,
            created : new Date(),
            updated : new Date()
        };

        var deferred = q.defer();
        FormModel.create(newForm, function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }


    function deleteFormById(formId){
        var deferred = q.defer();
        FormModel.findByIdAndRemove(formId, function (err, doc){
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function updateFormById (formId, form) {

        var newForm = {
            title : form.title,
            userId : form.userId,
            fields : form.fields,
            created : form.created,
            updated : new Date()
        };

        var deferred = q.defer();

        FormModel.findByIdAndUpdate(formId, newForm, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

    // FIELDS
    function getFieldsForForm(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc.fields);
            }

        });
        return deferred.promise;
    }

    function getFieldForForm(formId, fieldId) {
        var deferred = q.defer();

        FormModel.find({'_id' : formId}, formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var i = 0; i < doc.fields.length; i++) {
                    if (doc.fields[i]._id == fieldId) {
                        deferred.resolve(fields[i]);
                    }
                    else{
                        deferred.reject("Could not Find Field ID");v
                    }
                }
            }
        });
        return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {

        var deferred = q.defer();

        FormModel.update( { _id: formId }, { $pull: { fields: { _id: fieldId } } }, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function getFieldTemplate(fieldType) {
        for (var f in templates) {
            if (templates[f].type.toLowerCase() == fieldType.toLowerCase()) {
                return templates[f];
            }
        }
        return null;
    }

    function createFieldForForm(formId, field) {
        var deferred = q.defer();

        FormModel.findByIdAndUpdate(formId, {$push: {"fields": field}}, {new: true}, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

    function updateField(formId, field) {
        var deferred = q.defer();

        FormModel.update({_id: formId, "fields._id" : field._id}, {$set: {"fields.$": field}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

};