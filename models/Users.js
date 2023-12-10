const mongoose = require("mongoose")
const { validations, validationsText, roles, rolesEnum } = require("../constants/constants")

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        minLength: [validations.nameMin, validationsText.usernameMin],
        maxLength: [validations.nameMax, validationsText.usernameMax],
    },
    fullname: {
        type: String,
        required: false,
        minLength: [validations.fullNameMin, validationsText.fullNameMin],
        maxLength: [validations.fullNameMax, validationsText.fullNameMax],
    },
    email: {
        type: String,
        required: [true, validationsText.emailRequired],
        maxLength: [validations.emailMax, validationsText.emailRequired],
        unique: [true, validationsText.emailUnique],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: false,
    },
    otp: {
        code: {
            type: String,
            default: null,
            minLength: [validations.otpMin, validationsText.otpMin],
            maxLength: [validations.otpMax, validationsText.otpMax],
        },
        expiresIn: {
            type: Date,
            default: null
        }
    },
    phone: {
        type: String,
        minLength: [validations.phoneMin, validationsText.phoneMax],
        maxLength: [validations.phoneMax, validationsText.phoneMin],
        required: false
    },
    dob: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false,
        maxLength: [validations.bioMax, validationsText.bioMax],
    },
    profileImage: {
        type: String,
        required: false
    },
    role: {
        type: Number,
        required: [true, validationsText.roleRequired],
        default: roles.user,
        enum: rolesEnum,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isProfileCompleted: {
        type: Boolean,
        default: false,
    },
    isSocialLogin: {
        type: Boolean,
        default: false,
    },
    deviceType: {
        type: String,
        required: false,
    },
    deviceToken: {
        type: String,
        required: false
    },
    clientToken: {
        type: String,
        required: false
    },
    platformType: {
        type: String,
        required: false
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const Users = mongoose.model('Users', usersSchema)
module.exports = Users