const joi = require("joi")
const { validations } = require("../constants/constants")

const startChatSchema = joi.object({
    sender: joi.string().required(),
    receiver: joi.string().required(),
})

const createGroupSchema = joi.object({
    isGroupChat: joi.boolean().required(),
    groupName: joi.string().min(validations.groupNameMin).max(validations.groupNameMax).required(),
    groupAdmins: joi.array().required(),
    groupDescription: joi.string().max(validations.groupDescriptionMax),
    userIds: joi.array().required(),
    groupImage: joi.string()
})

module.exports = {
    startChatSchema,
    createGroupSchema
}