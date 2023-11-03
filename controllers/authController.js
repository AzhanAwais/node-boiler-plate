const BaseController = require("./baseController")
const User = require("../models/User")
const UserService = require("../services/userService")

class AuthController extends BaseController {
    constructor() {
        super(User)
    }

    async register(req, res, next) {
        try {
            const user = await UserService.createUser(req.body)

            res.status(200).send("hellow")
        }
        catch (e) {
            next(e)
        }
    }

}

module.exports = new AuthController()