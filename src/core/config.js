'use strict'

const pkg = require("../../package.json");
const Discord = require("discord.js");
const getenv = require("getenv");

require("dotenv").config({ silent: true });

const config = {
    pkg: pkg,
    version: pkg.version,
    author: 'Jack Senyitko',
    apiVersion: 'v1',
    url: "https://jsenyitko.tech",
    mongoUrl: getenv('MONGO_URL', null),
}

config.sessionSecret = getenv("SESSION_SECRET", null);

config.hookID = getenv("WEBHOOK_ID", null);
config.hookSecret = getenv("WEBHOOK_SECRET", null);

config.clientId = getenv("CLIENT_ID", null);
config.clientSecret = getenv("CLIENT_SECRET", null);
config.clientScopes = ['identify', 'email', 'guilds', 'guilds.join'];

config.guild = getenv("GUILD_ID", null);
config.prefix = getenv("PREFIX", null);
config.botToken = getenv("BOT_TOKEN", null);

config.client = new Discord.Client();
config.WebhookClient = new Discord.WebhookClient(config.hookID, config.hookSecret);

config.authenticationUrl = "/auth/discord";
config.successfulCallbackUrl = "/dashboard";
config.serverCallbackUrl = "/api/v1/callback";
config.clientCallbackUrl = 'https://jsenyitko.tech/api/v1/callback';



module.exports = config;