const BaseController = require("./baseController")
const User = require("../models/User")
const AuthService = require("../services/authService")
const userSchema = require("../schemas/userSchema")
const messages = require("../constants/messages")

class AuthController extends BaseController {
    constructor() {
        super(User)
    }

    async register(req, res, next) {
        try {
            const { error } = userSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const user = await AuthService.createUser(req.body)
            res.status(200).send({
                data: user,
                message: messages.userRegister
            })
        }
        catch (e) {
            return next(e)
        }
    }

}

module.exports = new AuthController()