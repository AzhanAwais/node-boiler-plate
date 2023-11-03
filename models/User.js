const mongoose = require("mongoose")
const { validations, validationsText, roles } = require("../constants/constants")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        minLength: [validations.nameMin, validationsText.usernameMin],
        maxLength: [validations.nameMax, validationsText.usernameMax],
        trim: true
    },
    name: {
        type: String,
        required: [true, validationsText.nameRequired],
        minLength: [validations.nameMin, validationsText.nameMin],
        maxLength: [validations.nameMax, validationsText.nameMax],
        trim: true
    },
    email: {
        type: String,
        required: [true, validationsText.emailRequired],
        maxLength: [validations.emailMax, validationsText.emailRequired],
        unique: [true, validationsText.emailUnique],
        lowercase: true,
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
    age: {
        type: Number,
        required: false
    },
    bio: {
        type: String,
        maxLength: [validations.bioMax, validationsText.bioMax],
        required: false,
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
        required: false
    },
    isFirstLogin: {
        type: Boolean,
        default: false,
        required: false
    },
    isSocialLogin: {
        type: Boolean,
        default: false,
        required: false
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