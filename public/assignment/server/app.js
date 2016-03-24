module.exports = function(app, uuid) {
    var userModel = require("./models/user.model.server.js")(uuid);
    var formModel = require("./models/form.model.server.js")(uuid);

    var userService = require("./services/user.service.server.js")(app, formModel, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel, userModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
}
