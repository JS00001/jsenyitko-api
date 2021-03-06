const passport = require("passport");
const DiscordStrategy = require('passport-discord').Strategy
const config = require("../core/config");
const db = require("../core/models");
 
let discordStrategy = new DiscordStrategy({
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: config.clientCallbackUrl,
    scope: config.clientScopes
},

async function(accessToken, refreshToken, profile, cb) {
    const collection = await db.collection('users');
    collection.findOne({id: profile.id}, (err, doc) => {
        return doc ? cb(err, doc) : collection.create({id: profile.id, ign: "None", username: profile.username, lastChangedUsername: 0, events: [], admin: false}, (err, result) => {return cb(err, result)})
    })
});

passport.use(discordStrategy);