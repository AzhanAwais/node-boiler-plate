const express = require("express")
const BaseRouter = require("./baseRoute")
const User = require("../models/User")
const AuthController = require("../controllers/authController")


class AuthRoute extends BaseRouter {
    constructor() {
        super(User)
        this.router = new express.Router()
        const authController = new AuthController()

        this.router.post("/register", authController.register.bind(this))
    }
}

module.exports = new AuthRoute