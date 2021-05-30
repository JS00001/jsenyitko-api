const Controller = require("../../core/controller");

class GetEvents extends Controller {
    constructor() {
        super();
        return {
            register: {
                api: true,
                authLevel: 1,
                uri: '/getevents',
                method: 'get',
                handler: this.getevents.bind(this)
            }
        }
    }

    async getevents(req, res) {
        const userData = req.doc,
        eventsArray = userData.events.reverse();
        return res.status(200).json(eventsArray);
    }
}

module.exports = GetEvents;