const joi = require("joi")
const { validations } = require("../constants/constants")

const userLoginSchema = joi.object({
    email: joi.string().max(validations.emailMax).required(),
    password: joi.string().max(validations.passwordMax).required(),
})

module.exports = userLoginSchema