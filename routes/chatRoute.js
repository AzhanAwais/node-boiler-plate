
const express = require("express")
const ChatController = require("../controllers/chatController")
const authMiddleware = require("../middlewares/authMiddleware")

class ChatRoute {
    constructor() {
        this.router = new express.Router()
        this.chatController = new ChatController()

        this.router.post("/start-chat", authMiddleware, this.chatController.startChat.bind(this))
        this.router.post("/send-message", authMiddleware, this.chatController.sendMessage.bind(this))
        this.router.delete("/delete-message/:id", authMiddleware, this.chatController.deleteMessage.bind(this))
        this.router.delete("/delete-chat/:id", authMiddleware, this.chatController.deleteChat.bind(this))
        this.router.get("/get-messages", authMiddleware, this.chatController.getMessages.bind(this))

        this.router.post("/block-user", authMiddleware, this.chatController.blockUser.bind(this))
        this.router.post("/unblock-user", authMiddleware, this.chatController.unblockUser.bind(this))
        this.router.post("/create-group", authMiddleware, this.chatController.createGroup.bind(this))

    }
}

module.exports = ChatRoute
