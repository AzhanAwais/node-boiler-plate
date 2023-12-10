const { startChatSchema, createGroupSchema, sendMessageSchema } = require("../schemas/chatSchema")
const chatService = require("../services/chatService")

class ChatController {

    async startChat(req, res, next) {
        try {
            const currUser = req.user
            const { sender, receiver } = req.body
            const userIds = [sender, receiver]

            const { error } = startChatSchema.validate(req.body)
            if (error) {
                return next(error)
            }
            const chat = await chatService.isChatAlreadyExists(userIds)

            if (!chat) {
                const newChat = await chatService.createChat(userIds, sender, receiver)
                res.status(201).json({
                    message: "Chat created successfully",
                    data: newChat
                })
            }
            const chatId = chat._id
            await chatService.markAllMsgsAsRead(chatId, currUser)

            res.status(200).json({
                message: "Chat fetch successfully",
                data: chat
            })

        }
        catch (e) {
            return next(e)
        }
    }

    async createGroup(req, res, next) {
        try {
            const currUser = req.user
            const { groupName, groupDescription, groupImage, userIds } = req.body
            const { error } = createGroupSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const newGroupChat = await chatService.createGroup(currUser, groupName, groupDescription, groupImage, userIds)
            res.status(201).json({
                message: "Group created successfully",
                data: newGroupChat
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async sendMessage(req, res, next) {
        try {
            const currUser = req.user
            const { chatId } = req.body
            const { error } = sendMessageSchema.validate(req.body)
            if (error) {
                return next(error)
            }
            const isChatExists = await chatService.isChatExists(chatId)
            const newMessage = await chatService.sendMessage(currUser, req.body)
            res.status(201).json({
                message: "Message send successfully",
                data: newMessage
            })
        }
        catch (e) {
            next(e)
        }
    }

    async deleteMessage(req, res, next) {
        try {
            const { id } = req.params
            const deletedMessage = await chatService.deleteMessage(id)

            res.status(200).json({
                message: "Message deleted successfully",
                data: deletedMessage
            })
        }
        catch (e) {
            next(e)
        }
    }


}

module.exports = ChatController