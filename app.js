const express = require("express")
const mongoose = require('mongoose')
const errorMiddleware = require("./middlewares/errorMiddleware")
const AuthRoute = require("./routes/authRoute")
const { PORT, DB_URL } = require("./config/index")

class App {
    app
    port
    db_url

    constructor() {
        this.app = express()
        this.port = PORT
        this.db_url = DB_URL

        this.initMiddlewares()
        this.initDb()
        this.initRoutes()
        this.initErrorMiddleware()
    }

    initMiddlewares() {
        this.app.use(express.json())
        this.app.use(express.json({ extended: false }))
    }

    initErrorMiddleware() {
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