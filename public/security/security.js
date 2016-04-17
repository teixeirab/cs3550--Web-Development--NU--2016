var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, projectUserModel, assignmentUserModel) {

    passport.use('project',   new LocalStrategy(projectLocalStrategy));
    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/project/login',    passport.authenticate('project'), projectLocalStrategy);
    app.post  ('/api/project/logout',   ideLogout);
    app.get   ('/api/project/loggedin', ideLoggedin);
    app.post  ('/api/project/register', ideRegister);

    app.post  ('/api/assignment/login',    passport.authenticate('assignment'), assignmentLocalStrategy);
    app.post  ('/api/assignment/logout',   logout);
    app.get   ('/api/assignment/loggedin', loggedin);
    app.post  ('/api/assignment/register', register);

    function projectLocalStrategy(username, password, done) {
        projectUserModel
            .findDeveloperByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function assignmentLocalStrategy(username, password, done) {
        assignmentUserModel
            .findByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        if(user.type == 'project') {
            projectUserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else if(user.type == 'assignment') {
            assignmentUserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }
};
