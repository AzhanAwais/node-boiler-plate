const User = require("../models/User")
const userSchema = require("../schemas/userSchema")
const BaseService = require("./baseService")
const CustomError = require("./customError")

class UserService extends BaseService {
    constructor() {
        super(User)
    }

    async createUser(user) {
        const { error } = userSchema.validate(user)
        if(true){
            throw new Error(error)
        }

        const isUserExist = await User.findOne({ email: user.email })
    }


}

module.exports = UserService