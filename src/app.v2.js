const getFiles = require('node-recursive-directory');
const cookieParser = require("cookie-parser");
const mongosession = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const http = require("http");

const auth = require("./middleware/authMiddleware");
const config = require('./core/config');
const db = require('./core/models');
require("./middleware/passportDiscord");

class App {
    constructor(port, app) {
        this.app = app
        this.port = port
    }

    async start() {
        const { app, port } = this;
        const server = new http.createServer(app);
        const routeFiles = await getFiles(`src/api/${config.apiVersion}`); 
        const usersDatabase = await db.collection('users');

        passport.serializeUser(async (user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser(async (obj, done) => {
            usersDatabase.findOne({ id: obj }, (err, doc) => {
                if(doc) done(null, doc);
            })
        })

        app.set('port', port || 8000);
        app.use(express.json());
        app.use(cookieParser());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static(config.staticFilePath));
        app.use(session({ secret: config.sessionSecret, cookie: {maxAge: 3600000 * 24}, resave: true, saveUninitialized: true, store: mongosession.create({mongoUrl: config.mongoUrl})}));

        this.intializePassport();

        routeFiles.forEach(fileName => {
            const routeController = require(fileName);
            this.createRoute(new routeController())
        })
        
        app.use(express.Router().get('(/*)?', (req, res, next) => {
            return res.sendFile(config.staticFileIndex)
        }))

        server.listen(app.get('port'), (e) => {
            if (e) return console.log(e);
            else {
                console.log(`Express server listening on port ${app.get('port')}`);
                console.log('Express server started successfully');
            }
        })
    }


    async intializePassport() {
        const {app} = this;

        app.use(passport.initialize());
        app.use(passport.session());
        app.get(config.authenticationUrl, passport.authenticate('discord'));
        app.get(config.serverCallbackUrl, passport.authenticate('discord', {successRedirect: config.successfulCallbackUrl, failureRedirect: config.authenticationUrl}));
    }


    async createRoute(route) {
        const { app } = this;
        for (let object in route) {
            let routeData = route[object];
            let uri = routeData.api ? `/api/${config.apiVersion}${routeData.uri}` : routeData.uri;
            if(routeData.protected) app[routeData.method](uri, auth.apiAuth, routeData.handler.bind(routeData));
            else app[routeData.method](uri, routeData.handler.bind(routeData));
            console.log(`* Route: ${JSON.stringify(routeData.method).toUpperCase()} ${uri} created`);
        }
    }
}

module.exports = App