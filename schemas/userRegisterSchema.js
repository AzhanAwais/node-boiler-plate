const joi = require("joi")
const { validations } = require("../constants/constants")

const userRegisterSchema = joi.object({
    username: joi.string().min(validations.usernameMin).max(validations.usernameMax),
    fullname: joi.string().min(validations.fullNameMin).max(validations.fullNameMax).required(),
    email: joi.string().max(validations.emailMax).required(),
    password: joi.string().max(validations.passwordMax).required(),
    phone: joi.string().min(validations.phoneMin).max(validations.phoneMax),
    bio: joi.string().max(validations.bioMax),
})

module.exports = userRegisterSchema