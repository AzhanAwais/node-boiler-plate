const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const path = require("path")
const errorMiddleware = require("./middlewares/errorMiddleware")
const { PORT, DB_URL } = require("./config/index")
const AuthRoute = require("./routes/authRoute")
const UserRoute = require("./routes/UserRoute")
const UploadFileRoute = require("./routes/uploadFileRoute")

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
        this.app.use(cors({ origin: "*" }))
        this.app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
    }

    initErrorMiddleware() {
        this.app.use(errorMiddleware)
    }

    initRoutes() {
        this.app.use(new AuthRoute().router)
        this.app.use(new UserRoute().router)
        this.app.use(new UploadFileRoute().router)
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