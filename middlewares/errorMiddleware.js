const CustomError = require("../services/CustomError")
const { ValidationError } = require("joi")

const errorHandler = (err, req, res, next) => {
    let status = 500
    let data = {
        message: err.message
    }

    if (err instanceof CustomError) {
        status = err.status

        data = {
            message: err.message
        }
    }

    if (err instanceof ValidationError) {
        status = 400

        data = {
            message: err.message
        }
    }

    data.stack = err.stack
    data.status = status

    return res.status(status).json(data)
}

module.exports = errorHandler