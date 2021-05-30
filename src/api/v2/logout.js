const Controller = require("../../core/controller");

class Logout extends Controller {
    constructor() {
        super();
        return {
            register: {
                api: false,
                authLevel: 0,
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