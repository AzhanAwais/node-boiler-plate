const joi = require("joi")
const { validations, messageTypesEnum } = require("../constants/constants")

const startChatSchema = joi.object({
    sender: joi.string().required(),
    receiver: joi.string().required(),
})

const createGroupSchema = joi.object({
    groupName: joi.string().min(validations.groupNameMin).max(validations.groupNameMax).required(),
    groupDescription: joi.string().max(validations.groupDescriptionMax),
    groupImage: joi.string(),
    userIds: joi.array().required(),
})

const sendMessageSchema = joi.object({
    messageType: joi.string().valid(...messageTypesEnum).required(),
})


module.exports = {
    startChatSchema,
    createGroupSchema,
    sendMessageSchema
}