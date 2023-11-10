const joi = require("joi")
const { validations } = require("../constants/constants")

const forgotPasswordSchema = joi.object({
    email: joi.string().max(validations.emailMax).required(),
})

module.exports = forgotPasswordSchema