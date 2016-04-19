var express = require('express');
var session       = require('express-session');
var cookieParser  = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/webdev';


// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT ||3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+ '/public'));


//    "amcharts3": "github:amcharts/amcharts3",
var projectUserModel = require("./public/project/implementation/server/models/user.model.server.js")(db, mongoose);
var assignmentUserModel = require("./public/assignment/server/models/user.model.server.js")(db, mongoose);

require("./public/security/security.js")(app, projectUserModel, assignmentUserModel, bcrypt);
require("./public/assignment/server/app.js")(app, db, mongoose, assignmentUserModel, bcrypt);
require("./public/project/implementation/server/app.js")(app, db, mongoose, projectUserModel, bcrypt);

//require("./public/experiments/omdb_mongo_db/server/app.js")(app, db, mongoose);
//require("./public/experiments/omdb/server/app.js")(app);

app.listen(port, ipaddress);