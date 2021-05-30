const db = require("../core/models");

async function apiAuth(req, res, next) {
    const apiKey = req.headers.authorization;
    const usersDatabase = await db.collection('users');

    const doc = await usersDatabase.findById(apiKey || null);
    if(!doc) return res.status(403).json({error: true, code: 403, message: "Unauthorized"});
    req.doc = doc;
    next();
}

async function adminApiAuth(req, res, next) {

}

module.exports = {apiAuth, adminApiAuth}