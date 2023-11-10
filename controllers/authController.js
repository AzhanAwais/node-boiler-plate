const BaseController = require("./baseController")
const User = require("../models/User")
const AuthService = require("../services/authService")
const userRegisterSchema = require("../schemas/userRegisterSchema")
const userLoginSchema = require("../schemas/userLoginSchema")
const CustomError = require("../services/customError")
const bcrypt = require("bcryptjs")
const JwtService = require("../services/jwtService")
const socialLoginSchema = require("../schemas/socialLoginSchema")
const forgotPasswordSchema = require("../schemas/forgotPasswordSchema")
const OtpService = require("../services/otpService")
const EmailService = require("../services/emailService")
const { emailTypes } = require("../constants/constants")
const sendOtpSchema = require("../schemas/sendOtpSchema")
const verifyOtpSchema = require("../schemas/verifyOtpSchema")
const resetPasswordSchema = require("../schemas/resetPasswordSchema")

class AuthController extends BaseController {
    static blackListedTokens = []

    constructor() {
        super(User)
    }

    async register(req, res, next) {
        try {
            const { error } = userRegisterSchema.validate(req.body)
            if (error) {
                return next(error)
            }
            const user = await AuthService.createUser(req.body)
            res.status(200).send({
                message: "User registerd successfully",
                data: user,
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const { error } = userLoginSchema.validate(req.body)
            if (error) {
                return next(error)
            }
            const user = await AuthService.findUserByEmail(email)
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return next(new CustomError(400, "Invalid login credentials"))
            }
            if (user.otp.code) {
                return next(new CustomError(400, "Please verify your otp to login"))
            }
            const token = JwtService.generateToken(user)
            res.status(200).send({
                message: "User login successfully",
                data: {
                    user,
                    token
                },
            })

        }
        catch (e) {
            return next(e)
        }
    }

    async socialLogin(req, res, next) {
        try {
            const isSocialLogin = true
            const reqBody = req.body

            const { error } = socialLoginSchema.validate(reqBody)
            if (error) {
                return next(error)
            }
            const user = await User.findOne({ email: reqBody.email })
            if (user) {
                const token = JwtService.generateToken(user)
                res.status(200).send({
                    message: "User login successfully",
                    data: {
                        user,
                        token
                    },
                })
            }
            reqBody.isVerified = true
            reqBody.isSocialLogin = true
            const newUser = await AuthService.createUser(reqBody, isSocialLogin)
            const token = JwtService.generateToken(newUser)

            res.status(200).send({
                message: "User registerd successfully",
                data: {
                    user: newUser,
                    token
                },
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async forgotPassword(req, res, next) {
        try {
            const { email } = req.body
            const { error } = forgotPasswordSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const user = await AuthService.findUserByEmail(email)
            const otp = OtpService.generateOtp()
            user.otp = {
                code: otp,
                expiresIn: OtpService.getExpiresIn()
            }
            await user.save()
            await EmailService.sendEmail(user.email, EmailService.getEmailSubject(emailTypes.forgotPassword), EmailService.getEmailHtml(user, otp, emailTypes.forgotPassword))

            res.status(200).send({
                message: "Otp code has been sent to your email",
                data: null,
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { password, confirmPassword } = req.body
            const { error } = resetPasswordSchema.validate(req.body)
            if (error) {
                return next(error)
            }
            if (password != confirmPassword) {
                return next(new CustomError(400, "Password and confirm password did not match"))
            }
            const token = AuthService.getTokenFormHeaders(req.headers)
            const user = await AuthService.findUserByToken(token)
            user.password = await bcrypt.hash(password, 10)
            await user.save()

            res.status(200).send({
                message: "Password reset successfully",
                data: user,
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async resendOtp(req, res, next) {
        try {
            const { email } = req.body
            const { error } = sendOtpSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const user = await AuthService.findUserByEmail(email)
            const otp = OtpService.generateOtp()
            user.otp = {
                code: otp,
                expiresIn: OtpService.getExpiresIn()
            }
            await user.save()
            await EmailService.sendEmail(user.email, EmailService.getEmailSubject(emailTypes.resendOtp), EmailService.getEmailHtml(user, otp, emailTypes.resendOtp))

            res.status(200).send({
                message: "Otp code has been sent to your email",
                data: null,
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async verifyOtp(req, res, next) {
        try {
            const { email, otp } = req.body
            const { error } = verifyOtpSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const user = await AuthService.findUserByEmail(email)
            const currentTimestamp = new Date().getTime()
            if (currentTimestamp > user.otp.expiresIn) {
                return next(new CustomError(419, "Otp code is expired"))
            }
            if (otp != user.otp.code) {
                return next(new CustomError(400, "Invalid otp code"))
            }
            user.otp = {
                code: null,
                expiresIn: null
            }
            const token = JwtService.generateToken(user)
            await user.save()

            res.status(200).send({
                data: {
                    message: "Otp has been verified",
                    token
                },
            })
        }
        catch (e) {
            return next(e)
        }

    }

    async logout(req, res, next) {
        try {
            const token = AuthService.getTokenFormHeaders(req.headers)
            AuthController.blackListedTokens.push(token)

            res.status(200).send({
                message: "User logout successfully",
                data: null,
            })
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = AuthController