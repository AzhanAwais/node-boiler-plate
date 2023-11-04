class CustomError extends Error {
    status
    message

    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static emailAlreadyExist(message = "Email already exists") {
        return new CustomError(409, message)
    }
}

module.exports = CustomError