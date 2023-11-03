const User = require("../models/User")
const userSchema = require("../schemas/userSchema")
const BaseService = require("./baseService")
const CustomError = require("./customError")
const { ValidationError } = require("joi")

class UserService extends BaseService {
    constructor() {
        super(User)
    }

    async createUser(user) {
        try {
            const { error } = userSchema.validate(user)

            if (error) {
                console.log("-============123213213")

                throw new Error(error)
            }

            // const isUserExist = await User.findOne({ email: user.email })
        }
        catch (e) {
            console.log("-============dasdasdsad")
            throw new Error(e)
        }
    }


}

module.exports = new UserService()