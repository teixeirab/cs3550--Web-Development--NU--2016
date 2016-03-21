var express = require('express');
var session       = require('express-session');
var cookieParser  = require('cookie-parser');
var bodyParser = require('body-parser');
var uuid = require("node-uuid");
var app = express();
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT ||3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static(__dirname+ '/public'));

require("./public/assignment/server/app2.js")(app, uuid);
require("./public/experiments/omdb/server/app.js")(app);

app.listen(port, ipaddress);