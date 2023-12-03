const joi = require("joi")
const { validations } = require("../constants/constants")

const startChatSchema = joi.object({
    sender: joi.string().required(),
    receiver: joi.string().required(),
})

module.exports = {
    startChatSchema
}