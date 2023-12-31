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
    userIds: joi.array().items(joi.string()).required(),
})

const sendMessageSchema = joi.object({
    chatId: joi.string().required(),
    sender: joi.string().required(),
    receiver: joi.string(),
    messageType: joi.number().valid(...messageTypesEnum).required(),
    message: joi.string().allow(''),
    images: joi.array().items(joi.string()),
    videos: joi.array().items(joi.string()),
    audio: joi.string(),
    docs: joi.array().items(
        joi.object({
            name: joi.string(),
            url: joi.string(),
        })
    ),

})

const blockAndUnblockUserSchema = joi.object({
    userId: joi.string().required()
})

module.exports = {
    startChatSchema,
    createGroupSchema,
    sendMessageSchema,
    blockAndUnblockUserSchema
}