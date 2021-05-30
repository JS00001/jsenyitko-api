const Controller = require("../../core/controller");

class GetUser extends Controller {
    constructor() {
        super();
        return {
            register: {
                api: true,
                authLevel: 0,
                uri: '/getuser',
                method: 'get',
                handler: this.getuser.bind(this)
            }
        }
    }

    async getuser(req, res) {
        const userData = req.user;
        if(!userData) return res.status(403).json({error: true, code: 403, message: "Unauthorized"});
        return res.status(200).json(userData);
    }
}

module.exports = GetUser;