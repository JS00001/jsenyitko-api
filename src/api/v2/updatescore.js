const Controller = require("../../core/controller");

class UpdateScore extends Controller {
    constructor() {
        super();
        return {
            register: {
                api: true,
                authLevel: 2,
                uri: '/updatescore',
                method: 'put',
                handler: this.updatescore.bind(this)
            }
        }
    }

    async updatescore(req, res) {
        return res.json({test: "test"})
    }
}

module.exports = UpdateScore;