const SocketConnection = require("../sockets/socketConnection")

class SocketChat extends SocketConnection{
    constructor(server) {
        super(server)
        this.initSocketEvents()
    }

    initSocketEvents() {
        this.io.on("connection", () => {
            console.log("asdjaskdhskajds")
        })
    }
}

module.exports = SocketChat