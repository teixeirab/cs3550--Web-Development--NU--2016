module.exports = function(app, db, mongoose, assignmentUserModel, bcrypt) {
    var formModel = require("./models/form.model.server.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, formModel, assignmentUserModel, bcrypt);
    var formService = require("./services/form.service.server.js")(app, formModel, assignmentUserModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
}
