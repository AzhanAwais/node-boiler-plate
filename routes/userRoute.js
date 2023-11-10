const User = require("../models/User")
const userRegisterSchema = require("../schemas/userRegisterSchema")
const BaseRoute = require("./baseRoute")

class UserRoute extends BaseRoute {
    constructor() {
        super(User, userRegisterSchema, "user")
    }
}

module.exports = UserRoute