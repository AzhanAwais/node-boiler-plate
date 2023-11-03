const express = require("express")
const mongoose = require('mongoose')
const errorMiddleware = require("./middlewares/errorMiddleware")
const AuthRoute = require("./routes/authRoute")

class App {
    app
    port
    db_url

    constructor(port, db_url) {
        this.app = express()
        this.port = port
        this.db_url = db_url

        this.initDb()
        this.initRoutes()
        this.initMiddlewares()
    }

    initMiddlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(errorMiddleware)
    }

    initRoutes() {
        this.app.use(AuthRoute.router)
    }

    initDb() {
        mongoose.connect(this.db_url).then(() => {
            console.log("Db connected successfully")
        }).catch((e) => {
            console.log("Problem with db connection")
        })
    }

    initServer() {
        this.app.listen(this.port, () => {
            console.log(`listen port ${this.port}`)
        })
    }

}

module.exports = App