const Controller = require("../../core/controller");

class GetEvents extends Controller {
    constructor() {
        super();
        return {
            register: {
                api: true,
                protected: true,
                uri: '/getevents',
                method: 'get',
                handler: this.getevents.bind(this)
            }
        }
    }

    async getevents(req, res) {
        const userDoc = req.doc;
        const eventsArray = userDoc.events.reverse();
        return res.status(200).json(eventsArray);
    }
}

module.exports = GetEvents;