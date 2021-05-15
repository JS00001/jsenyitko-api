const config = require("../core/config");
const db = require("../core/models");

async function sessionAuth(req, res, next) {
    if(req.user) next()
    else res.redirect(config.authenticationUrl);
}

async function apiAuth(req, res, next) {
    const apiKey = req.headers.authorization;
    const usersDatabase = await db.collection('users');

    const doc = await usersDatabase.findById(apiKey);
    if(!doc) return res.status(403).json({error: true, code: 403, message: "Unauthorized"});
    req.doc = doc;
    next()
}

module.exports = {sessionAuth, apiAuth}