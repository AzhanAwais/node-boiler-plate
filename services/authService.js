const User = require("../models/User")
const userSchema = require("../schemas/userSchema")
const BaseService = require("./baseService")
const bcrypt = require("bcryptjs")
const CustomError = require("./customError")

class AuthService extends BaseService {
    constructor() {
        super(User)
    }

    async createUser(user, isSocialLogin = false) {
        const isUserExists = await User.exists({ email: user.email })

        if (isUserExists) {
            throw CustomError.emailAlreadyExist(`User already exists with the email ${user.email}`)
        }

        if (!isSocialLogin) {
            user.password = await bcrypt.hash(user.password, 10)
        }

        const userDoc = new User(user)
        const newUser = await userDoc.save()
        return newUser

    }


}

module.exports = new AuthService()