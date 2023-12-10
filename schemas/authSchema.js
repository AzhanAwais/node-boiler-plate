const joi = require("joi")
const { validations, rolesEnum } = require("../constants/constants")

const userRegisterSchema = joi.object({
    username: joi.string().min(validations.usernameMin).max(validations.usernameMax),
    fullname: joi.string().min(validations.fullNameMin).max(validations.fullNameMax).required(),
    email: joi.string().max(validations.emailMax).required(),
    password: joi.string().max(validations.passwordMax).required(),
    phone: joi.string().min(validations.phoneMin).max(validations.phoneMax),
    dob: joi.string(),
    bio: joi.string().max(validations.bioMax),
    profileImage: joi.string(),
    role: joi.number().valid(...rolesEnum),
    deviceType: joi.string(),
    deviceToken: joi.string(),
})

const userLoginSchema = joi.object({
    email: joi.string().max(validations.emailMax).required(),
    password: joi.string().max(validations.passwordMax).required(),
})

const socialLoginSchema = joi.object({
    email: joi.string().max(validations.emailMax).required(),
    clientToken: joi.string().required(),
    platformType: joi.string().required(),
})

const sendOtpSchema = joi.object({
    email: joi.string().max(validations.emailMax).required(),
})

const verifyOtpSchema = joi.object({
    email: joi.string().max(validations.emailMax).required(),
    otp: joi.string().min(validations.otpMin).max(validations.otpMax).required(),
})

const forgotPasswordSchema = joi.object({
    email: joi.string().max(validations.emailMax).required(),
})

const resetPasswordSchema = joi.object({
    password: joi.string().max(validations.passwordMax).required(),
    confirmPassword: joi.string().max(validations.passwordMax).required(),
})

module.exports = {
    userRegisterSchema,
    userLoginSchema,
    socialLoginSchema,
    sendOtpSchema,
    verifyOtpSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
}