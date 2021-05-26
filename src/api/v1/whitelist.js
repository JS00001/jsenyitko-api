const Controller = require("../../core/controller");
const ws = require("../../socket");

class Whitelist extends Controller {
    constructor() {
        super();
        return {
            register: {
                api: true,
                protected: true,
                uri: '/whitelist',
                method: 'post',
                handler: this.whitelist.bind(this)
            }
        }
    }

    async whitelist(req, res) {
        const userDoc = req.doc;
        const newIgn = req.query.ign; 
        
        const weekMS = 604800000;
        const time = new Date().getTime();
        const timeDifference = time - weekMS;

        if(!newIgn) return res.status(404).json({error: true, code: 404, message: "Invalid_Arguments"});
        if(userDoc.lastChangedUsername > timeDifference) return res.status(400).json({error: true, code: 403, message: "Recently_Changed"});

        await userDoc.updateOne({$set: {ign: newIgn, lastChangedUsername: time}});
        res.status(200).json({error: false, code: 200, message: "Success"});
        ws.sendClientMessage(`whitelist add ${newIgn}`);
    }
}

module.exports = Whitelist;