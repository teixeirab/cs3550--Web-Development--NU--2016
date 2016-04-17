module.exports = function(app, uuid, db, mongoose) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    var userModel = require("./models/user.model.server.js")(uuid, db, mongoose);
    var companyModel = require("./models/company.model.server.js")(uuid, db, mongoose);
    var portfolioModel = require("./models/portfolio.model.server.js")(uuid, db, mongoose);
    var gameModel = require("./models/game.model.server.js")(uuid, db, mongoose, companyModel);

    var userService = require("./services/user.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel, passport,isAdmin, authorized, bcrypt);
    var companyService = require("./services/company.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel, passport,isAdmin, authorized);
    var gameService = require("./services/game.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel, passport,isAdmin, authorized);
    var portfolioService = require("./services/portfolio.service.server.js")(app, userModel, gameModel, companyModel, portfolioModel, passport,isAdmin, authorized);

    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));

    app.get   ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get   ('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));

    var googleConfig = {
        clientID        : process.env.GOOGLE_CLIENT_ID,
        clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL     : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID        : process.env.FACEBOOK_CLIENT_ID,
        clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL     : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

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

};
