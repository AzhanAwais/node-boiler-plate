const joi = require("joi")
const { validations } = require("../constants/constants")

const resetPasswordSchema = joi.object({
    password: joi.string().max(validations.passwordMax).required(),
    confirmPassword: joi.string().max(validations.passwordMax).required(),
})

module.exports = resetPasswordSchema