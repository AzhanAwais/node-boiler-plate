const joi = require("joi")
const { validations } = require("../constants/constants")

const sendOtpSchema = joi.object({
    email: joi.string().max(validations.emailMax).required(),
})

module.exports = sendOtpSchema