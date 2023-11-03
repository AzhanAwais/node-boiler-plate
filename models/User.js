const mongoose = require("mongoose")
const { validations, validationsText, roles } = require("../constants/constants")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        minLength: [validations.nameMin, validationsText.usernameMin],
        maxLength: [validations.nameMax, validationsText.usernameMax],
    },
    fullname: {
        type: String,
        required: [true, validationsText.fullNameRequired],
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
        required: [true, validationsText.passwordRequired],
    },
    phone: {
        type: String,
        minLength: [validations.phoneMin, validationsText.phoneMax],
        maxLength: [validations.phoneMax, validationsText.phoneMin],
        required: false
    },
    dob: {
        type: Date,
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
        type: String,
        required: [true, validationsText.roleRequired],
        default: roles.user,
        enum: [roles.user, roles.admin]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isFirstLogin: {
        type: Boolean,
        default: false,
    },
    isSocialLogin: {
        type: Boolean,
        default: false,
    },
    clientToken: {
        type: String,
        required: false
    },
    platformType: {
        type: String,
        required: false
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User