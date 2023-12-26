const { startChatSchema, createGroupSchema, sendMessageSchema, blockAndUnblockUserSchema } = require("../schemas/chatSchema")
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
            await chatService.isChatExists(chatId)
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

    async deleteChat(req, res, next) {
        try {
            const currUser = req.user
            const { id } = req.params
            const deletedChat = await chatService.deleteChat(id, currUser)

            res.status(200).json({
                message: "Chat deleted successfully",
                data: deletedChat
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async blockUser(req, res, next) {
        const currUser = req.user
        const { userId } = req.body
        const userIds = [currUser, userId]

        try {
            const { error } = blockAndUnblockUserSchema.validate(req.body)
            if (error) {
                return next(error)
            }
            const chat = await chatService.blockUser(userIds, userId)

            res.status(200).json({
                message: "User blocked successfully",
                data: chat
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async unblockUser(req, res, next) {
        const currUser = req.user
        const { userId } = req.body
        const userIds = [currUser, userId]

        try {
            const { error } = blockAndUnblockUserSchema.validate(req.body)
            if (error) {
                return next(error)
            }
            const chat = await chatService.unblockUser(userIds, userId)

            res.status(200).json({
                message: "User unblocked successfully",
                data: chat
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async getMessages(req, res, next) {
        try {
            const { chatId } = req.params
            const messages = await chatService.getMessages(chatId)
            res.status(200).json({
                message: "Messages fetch successfully",
                data: messages
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async getChatUsers(req, res, next) {
        try {
            const currUser = req.user
            const chatUsers = await chatService.getChatUsers(currUser)
            res.status(200).json({
                message: "Chat Users fetch successfully",
                data: chatUsers
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async searchUsers(req, res, next) {
        try {
            let query = req.query
            const currUser = req.user

            const users = await chatService.searchUsers(currUser, query)
            res.status(200).json({
                message: "Users fetch successfully",
                data: users
            })
        }
        catch (e) {
            return next(e)
        }
    }

}

module.exports = ChatController