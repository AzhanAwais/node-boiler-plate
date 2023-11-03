const BaseController = require("./baseController")
const User = require("../models/User")

class AuthController extends BaseController {
    constructor() {
        super(User)
    }

    async register(req, res, next) {
        console.log("=-=-=-=-")
        try {
            res.status(200).send("hellow")
        }
        catch (e) {
            next(e)
        }
    }

}

module.exports = AuthController