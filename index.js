console.clear();

const App = require("./src/app.v2");
const Express = require("express");
require("./src/socket");
require("./src/discord");

const server = new App(80, Express());
server.start();