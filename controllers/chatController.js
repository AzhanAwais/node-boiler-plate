const { startChatSchema } = require("../schemas/chatSchema")
const chatService = require("../services/chatService")

class ChatController {
    // return next(new CustomError(400, "Invalid login credentials"))

    async startChat(req, res, next) {
        try {
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
            
            res.status(200).json({
                message: "Chat fetch successfully",
                data: chat
            })

        }
        catch (e) {
            return next(e)
        }
    }
}

module.exports = ChatController