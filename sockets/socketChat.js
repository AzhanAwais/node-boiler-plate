const SocketConnection = require("../sockets/socketConnection")

class SocketChat extends SocketConnection {
    constructor(server) {
        super(server)
        this.initSocketEvents()
    }

    initSocketEvents() {
        const chatIo = this.io.of("/chat")

        chatIo.on("connection", async (socket) => {
            const currUserId = socket?.handshake?.auth?._id

            socket.on("getOnlineUser", async () => {
                socket.broadcast.emit('getOnlineUser', { userId: currUserId })
            })

            socket.on("getOfflineUser", async (userId) => {
                socket.broadcast.emit('getOfflineUser', { userId: userId })
            })

            socket.on("groupCreated", async (data) => {
                socket.broadcast.emit('groupCreated', { group: data.group })
            })

        })
    }
}

module.exports = SocketChat