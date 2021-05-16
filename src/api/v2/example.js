const Controller = require("../../core/controller");

class Example extends Controller {
    constructor() {
        super();
        return {
            example: {
                api: true,
                authLevel: 0,
                uri: '/example',
                method: 'get',
                handler: this.example.bind(this)
            }
        }
    }

    async example() { 

    }
}

module.exports = Example