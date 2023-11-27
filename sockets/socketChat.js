const SocketConnection = require("../sockets/socketConnection")

class SocketChat extends SocketConnection {
    constructor(server) {
        super(server)
        this.initSocketEvents()
    }

    initSocketEvents() {
        const chatIo = this.io.of("/chat")

        chatIo.on("connection", (socket) => {

            chatIo.on("joinRoom", (data) => {
                const { sender, receiver } = data
                const room = ""
            })
        })
    }
}

module.exports = SocketChat