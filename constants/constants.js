const validations = {
    emailMax: 64,
    fullNameMin: 5,
    fullNameMax: 32,
    usernameMin: 3,
    usernameMax: 32,
    passwordMax: 320,
    phoneMin: 11,
    phoneMax: 11,
    bioMax: 320,
    otpMin: 4,
    otpMax: 4,
}


const validationsText = {
    emailMax: `Email: Maximum ${validations.emailMax} characters are allowed`,
    emailRequired: "Email is required",
    emailUnique: "Email already exists",

    fullNameMin: `Name: Maximum ${validations.fullNameMin} characters are allowed`,
    fullNameMax: `Name: Maximum ${validations.fullNameMax} characters are allowed`,
    fullNameRequired: `Name is required`,

    usernameMin: `Username: Maximum ${validations.usernameMin} characters are allowed`,
    usernameMax: `Username: Maximum ${validations.usernameMax} characters are allowed`,
    usernameRequired: `Username is required`,

    passwordRequired: "Password is required",
    passwordMax: `Password: Maximum ${validations.passwordMax} characters are allowed`,

    OtpRequired: "Otp is required",
    OtpMax: `Password: Minimum ${validations.otpMin} characters are allowed`,
    OtpMax: `Password: Maximum ${validations.otpMax} characters are allowed`,

    phoneMin: `Phone: Minimum ${validations.phoneMin} digits are allowed`,
    phoneMax: `Phone: Minimum ${validations.phoneMax} digits are allowed`,
    phoneRequried: `Phone number is requried`,

    bioMax: `Bio: Maximum ${validations.bioMax} characters are allowed`,
}

const roles = {
    admin: "admin",
    user: "user"
}

const emailTypes = {
    register: "register",
    forgotPassword: "forgotPassword",
    resendOtp: "resendOtp"
}

module.exports = {
    validations,
    validationsText,
    roles,
    emailTypes
}