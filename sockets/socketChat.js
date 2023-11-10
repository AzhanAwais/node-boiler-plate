const SocketConnection = require("../sockets/socketConnection")

class SocketChat extends SocketConnection {
    constructor(server) {
        super(server)

        this.initSocketEvents()
    }

    initSocketEvents() {
        const chatIo = this.io.of("/chat")

        chatIo.on("connection", (socket) => {
            console.log("asdjaskdhskajds")
        })
    }
}

module.exports = SocketChat