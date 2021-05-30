const Controller = require("../../core/controller");
const config = require("../../core/config");
const ws = require("../../socket");

class Whitelist extends Controller {
    constructor() {
        super();
        return {
            register: {
                api: true,
                authLevel: 1,
                uri: '/whitelist',
                method: 'post',
                handler: this.whitelist.bind(this)
            }
        }
    }

    async whitelist(req, res) {
        const time = new Date().getTime(),
        newIgn = req.query.ign,
        userData = req.doc,
        nameCooldown = config.nameCooldown,
        timeDifference = time - nameCooldown;

        if(!newIgn) return res.status(422).json({error: true, code: 422, message: "Invalid_Args"});
        if(userData.lastChangedUsername >= timeDifference) return res.status(403).json({error: true, code: 403, message: "Time_Error"});

        await userData.updateOne({$set: {ign: newIgn, lastChangedUsername: time}});
        res.status(200).json({error: false, code: 200, message: "Success"});
        ws.sendClientMessage(`whitelist add ${newIgn}`);

    }
}

module.exports = Whitelist;