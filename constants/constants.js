const validations = {
    emailMax: 64,
    nameMin: 5,
    nameMax: 32,
    usernameMin: 3,
    usernameMax: 32,
    phoneMin: 11,
    phoneMax: 11,
    bioMax: 320
}


const validationsText = {
    emailMax: `Email: Maximum ${validations.emailMax} characters are allowed`,
    emailRequired: "Email is required",
    emailUnique: "Email already exists",

    nameMin: `Name: Maximum ${validations.nameMin} characters are allowed`,
    nameMax: `Name: Maximum ${validations.nameMax} characters are allowed`,
    nameRequired: `Name is required`,

    usernameMin: `Username: Maximum ${validations.usernameMin} characters are allowed`,
    usernameMax: `Username: Maximum ${validations.usernameMax} characters are allowed`,
    usernameRequired: `Username is required`,

    passwordRequired: "Password is required",

    phoneMin: `Phone: Minimum ${validations.phoneMin} digits are allowed`,
    phoneMax: `Phone: Minimum ${validations.phoneMax} digits are allowed`,
    phoneRequried: `Phone number is requried`,

    bioMax: `Bio: Maximum ${validations.bioMax} characters are allowed`,


}


const roles = {
    admin: 1,
    user: 2
}

module.exports = {
    validations,
    validationsText,
    roles
}