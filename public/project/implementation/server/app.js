module.exports = function(app, uuid, db, mongoose) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    var userModel = require("./models/user.model.server.js")(uuid, db, mongoose);
    var companyModel = require("./models/company.model.server.js")(uuid, db, mongoose);
    var portfolioModel = require("./models/portfolio.model.server.js")(uuid, db, mongoose);
    var gameModel = require("./models/game.model.server.js")(uuid, db, mongoose, companyModel);

    var userService = require("./services/user.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel, passport,isAdmin, authorized, bcrypt);
    var companyService = require("./services/company.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel, passport,isAdmin, authorized);
    var gameService = require("./services/game.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel, passport,isAdmin, authorized);
    var portfolioService = require("./services/portfolio.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel, passport,isAdmin, authorized);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done){
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if (user && bcrypt.compareSync(password, user.password)){
                        return done(null, user);
                    }else {
                        return done(null, false);
                    }
                },
                function(err){
                    if (err) {return done(err);}
                }
            )
    }

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null,user);
                },
                function(err){
                    done(err, null);
                }
            )
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            console.log("hey ")
            next();
        }
    }
    function isAdmin(req, res, next){
        if(req.user.role != 'admin'){
            res.send(403);
        }
        else {
            next();
        }
    }

}
