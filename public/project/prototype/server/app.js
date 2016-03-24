module.exports = function(app, uuid) {
    var userModel = require("./models/user.model.server.js")(uuid);
    var companyModel = require("./models/company.model.server.js")(uuid);
    var portfolioModel = require("./models/portfolio.model.server.js")(uuid);
    var gameModel = require("./models/game.model.server.js")(uuid);

    var userService = require("./services/user.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel);
    var companyService = require("./services/company.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel);
    var gameService = require("./services/game.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel);
    var portfolioService = require("./services/portfolio.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel);
}
