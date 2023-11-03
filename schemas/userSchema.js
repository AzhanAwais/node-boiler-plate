const joi = require("joi")
const { validations } = require("../constants/constants")

const userSchema = joi.object({
    username: joi.string().min(validations.usernameMin).max(validations.usernameMax),
    fullname: joi.string().min(validations.fullNameMin).max(validations.fullNameMax).required(),
    email: joi.string().max(validations.emailMax).required(),
    password: joi.string().required(),
    phone: joi.string().min(validations.phoneMin).max(validations.phoneMax),
    dob: joi.string(),
    bio: joi.string().max(validations.bioMax),
    profileImage: joi.string(),
    role: joi.string(),
    isVerified: joi.boolean(),
    isFirstLogin: joi.boolean(),
    isSocialLogin: joi.boolean(),
    clientToken: joi.string(),
    platformType: joi.string(),
})

module.exports = userSchema