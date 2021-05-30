const Controller = require("../../core/controller");

class GetScores extends Controller {
    constructor() {
        super();
        return {
            register: {
                api: true,
                authLevel: 2,
                uri: '/getscores',
                method: 'get',
                handler: this.getscores.bind(this)
            }
        }
    }

    async getscores(req, res) {
        return res.json({test: "test"})
    }
}

module.exports = GetScores;