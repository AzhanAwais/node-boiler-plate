const User = require("../models/Users")
const userRegisterSchema = require("../schemas/userRegisterSchema")
const BaseRoute = require("./baseRoute")

class UserRoute extends BaseRoute {
    static populateFields = []

    constructor() {
        super(User, userRegisterSchema, UserRoute.populateFields, "user")
    }
}

module.exports = UserRoute