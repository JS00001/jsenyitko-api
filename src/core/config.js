const pkg = require("../../package.json");
const Discord = require("discord.js");
const getenv = require("getenv");
const path = require("path");

require("dotenv").config({ silent: true });

const config = {
    node_env: getenv("NODE_ENV", null),
    author: 'Jsenyitko',
    apiVersion: 'v2',
    url: "https://jsenyitko.tech"
}

// File Path Variables
config.staticFilePath = path.resolve("../jsenyitko-api/static");
config.staticFileIndex = path.resolve("../jsenyitko-api/static/index.html");


// General Variables 
config.mongoUrl = getenv('MONGO_URL', null);
config.sessionSecret = getenv("SESSION_SECRET", null);
config.nameCooldown = getenv.int("NAMECHANGE_COOLDOWN", null);


// Discord Webhook Variables 
config.hookID = getenv("WEBHOOK_ID", null);
config.hookSecret = getenv("WEBHOOK_SECRET", null);


// Discord oAuth2 Variables
config.clientId = getenv("CLIENT_ID", null);
config.clientSecret = getenv("CLIENT_SECRET", null);
config.clientScopes = ['identify', 'email', 'guilds', 'guilds.join'];


// Discord Bot Variables
config.guild = getenv("GUILD_ID", null);
config.prefix = getenv("PREFIX", null);
config.botToken = getenv("BOT_TOKEN", null);


// Discord Variables
config.client = new Discord.Client();
config.WebhookClient = new Discord.WebhookClient(config.hookID, config.hookSecret);


// Redirects
config.authenticationUrl = "/auth/discord";
config.successfulCallbackUrl = "/dashboard";
config.serverCallbackUrl = `/api/${config.apiVersion}/callback`;


// NODE_ENV Based Variables
config.clientCallbackUrl = config.node_env === "production"  
? `https://jsenyitko.tech/api/${config.apiVersion}/callback` 
: `http://localhost/api/${config.apiVersion}/callback`;






module.exports = config;