const Controller = require("../../core/controller");
const config = require("../../core/config");

class Logout extends Controller {
    constructor() {
        super();
        return {
            register: {
                api: false,
                protected: false,
                uri: '/auth/logout',
                method: 'get',
                handler: this.logout.bind(this)
            }
        }
    }

    async logout(req, res) {
        req.logout();
        req.session.destroy;
        return res.redirect(config.authenticationUrl);
    }
}

module.exports = Logout;