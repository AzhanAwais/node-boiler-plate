const joi = require("joi")
const { validations } = require("../constants/constants")

const verifyOtpSchema = joi.object({
    email: joi.string().max(validations.emailMax).required(),
    otp: joi.string().min(validations.otpMin).max(validations.otpMax).required(),
})

module.exports = verifyOtpSchema