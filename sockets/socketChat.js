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
            const currUser = socket?.handshake?.auth

            socket.on("getOnlineUser", async () => {
                socket.broadcast.emit('getOnlineUser', { userId: currUser._id })
            })

            socket.on("getOfflineUser", async () => {
                socket.broadcast.emit('getOfflineUser', { userId: currUser._id })
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
                const roomId = data.chatId.toString()
                const chatUsersList = await getChatUsers(currUser)

                socket.broadcast.emit('message', {
                    message: data.messageData,
                    chatUsersList: chatUsersList
                })
            })

        })
    }
}

module.exports = SocketChat