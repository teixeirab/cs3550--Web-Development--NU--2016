module.exports = function(app, uuid, db, mongoose) {
    var userModel = require("./models/user.model.server.js")(uuid, db, mongoose);
    var companyModel = require("./models/company.model.server.js")(uuid, db, mongoose);
    var portfolioModel = require("./models/portfolio.model.server.js")(uuid, db, mongoose);
    var gameModel = require("./models/game.model.server.js")(uuid, db, mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel);
    var companyService = require("./services/company.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel);
    var gameService = require("./services/game.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel);
    var portfolioService = require("./services/portfolio.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel);
}
