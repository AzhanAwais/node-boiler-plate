const joi = require("joi")

const uploadFileSchema = joi.object({
    file: joi.required(),
})

module.exports = uploadFileSchema