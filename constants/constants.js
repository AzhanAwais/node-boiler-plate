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
    groupDescriptionMax: 120,
    groupNameMin: 3,
    groupNameMax: 32,
    groupDescriptionMax: 120
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

    otpRequired: "Otp is required",
    otpTypeRequired: "Otp type is required",
    otpMin: `Otp: Minimum ${validations.otpMin} characters are allowed`,
    otpMax: `Otp: Maximum ${validations.otpMax} characters are allowed`,

    phoneMin: `Phone: Minimum ${validations.phoneMin} digits are allowed`,
    phoneMax: `Phone: Maximum ${validations.phoneMax} digits are allowed`,
    phoneRequried: `Phone number is requried`,

    groupDescriptionMax: `Description: Maximum ${validations.groupDescriptionMax} characters are allowed`,
    groupNameMin: `Name: Minimum ${validations.groupNameMin} characters are allowed`,
    groupNameMax: `Name: Maximum ${validations.groupNameMax} characters are allowed`,

    bioMax: `Bio: Maximum ${validations.bioMax} characters are allowed`,

    messageTypeRequired: `Message type is required`,
    senderRequried: `Sender id is required`,
    receiverRequired: `Receiver id type is required`,
    userIdsRequired: "User ids is requried",
    chatIdRequired: "Chat id is required",
}

const roles = {
    admin: 1,
    user: 2
}

const messageTypes = {
    text: 1,
    image: 2,
    video: 3,
    audio: 4,
    doc: 5,
}

const emailTypes = {
    register: "register",
    forgotPassword: "forgotPassword",
    resendOtp: "resendOtp"
}

const rolesEnum = [roles.admin, roles.user]
const messageTypesEnum = [messageTypes.audio, messageTypes.doc, messageTypes.image, messageTypes.text, messageTypes.video]
const emailTypesEnum = [emailTypes.forgotPassword, emailTypes.register]

module.exports = {
    validations,
    validationsText,
    roles,
    emailTypes,
    messageTypes,
    rolesEnum,
    messageTypesEnum,
    emailTypesEnum
}