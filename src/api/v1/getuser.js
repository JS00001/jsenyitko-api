const Controller = require("../../core/controller");
const db = require("../../core/models");

class GetUser extends Controller {
    constructor() {
        super();
        return {
            register: {
                api: true,
                protected: false,
                uri: '/getuser',
                method: 'get',
                handler: this.getuser.bind(this)
            }
        }
    }

    async getuser(req, res) {
        if(!req.user) return res.status(403).json({error: true, code: 403, message: "Unauthorized"});
        return res.status(200).json(req.user);
    }
}

module.exports = GetUser;