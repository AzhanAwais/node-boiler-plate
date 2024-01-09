const { getChatUsers } = require("../services/chatService")
const SocketConnection = require("../sockets/socketConnection")

class SocketChat extends SocketConnection {
    constructor(server) {
        super(server)
        this.initSocketEvents()
    }

    initSocketEvents() {
        const chatIo = this.io.of("/chat")

        chatIo.on("connection", async (socket) => {

            socket.on("getOnlineUser", async (currUser) => {
                socket.broadcast.emit('getOnlineUser', { userId: currUser._id })
            })

            socket.on("getOfflineUser", async (currUser) => {
                socket.broadcast.emit('getOfflineUser', { userId: currUser._id })
            })

            socket.on("startChat", async (data) => {
                const currUser = data.currUser
                const chatUsersList = await getChatUsers(currUser)

                chatUsersList.forEach((item) => {
                    let roomId = item._id.toString()
                    socket.join(roomId)
                })
                socket.broadcast.emit('startChat', { chat: data.chat })
            })

            socket.on("groupCreated", async (data) => {
                socket.broadcast.emit('groupCreated', { group: data.group })
            })

            socket.on("joinRoom", async (currUser) => {
                const chatUsersList = await getChatUsers(currUser)
                chatUsersList.forEach((item) => {
                    let roomId = item._id.toString()
                    socket.join(roomId)
                })
            })

            socket.on("message", async (data) => {
                const currUser = data.currUser
                const roomId = data.chatId.toString()
                const chatUsersList = await getChatUsers(currUser)

                chatIo.to(roomId).emit('message', {
                    message: data.messageData,
                    chatUsersList: chatUsersList
                })
            })

            socket.on("deleteMessage", async (data) => {
                const currUser = data.currUser
                const roomId = data.chatId.toString()
                const chatUsersList = await getChatUsers(currUser)

                chatIo.to(roomId).emit('deleteMessage', {
                    message: data.message,
                    chatUsersList: chatUsersList
                })
            })

        })
    }
}

module.exports = SocketChat