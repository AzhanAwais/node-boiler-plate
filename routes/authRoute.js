const express = require("express")
const BaseRoute = require("./BaseRoute")
const User = require("../models/User")
const AuthController = require("../controllers/authController")

class AuthRoute extends BaseRoute {
    constructor() {
        super(User)
        this.router = new express.Router()

        this.router.post("/register", AuthController.register.bind(this))
    }
}

module.exports = new AuthRoute