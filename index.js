const App = require("./src/app");
const Express = require("express");
require("./src/socket");
require("./src/discord");

const server = new App(80, Express());
server.start();