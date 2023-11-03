const BaseController = require("./baseController")
const User = require("../models/User")
const UserService = require("../services/userService")

class AuthController extends BaseController {
    constructor() {
        super(User)
        this.userService = new UserService()

    }

    async register(req, res, next) {
        try {
            console.log(req.body)
            // const user = await this.userService.createUser(req.body)

            res.status(200).send("hellow")
        }
        catch (e) {
            next(e)
        }
    }

}

module.exports = new AuthController()