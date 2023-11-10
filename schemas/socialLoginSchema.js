const joi = require("joi")
const { validations } = require("../constants/constants")

const socialLoginSchema = joi.object({
    email: joi.string().max(validations.emailMax).required(),
    clientToken: joi.string().required(),
    platformType: joi.string().required(),
})

module.exports = socialLoginSchema