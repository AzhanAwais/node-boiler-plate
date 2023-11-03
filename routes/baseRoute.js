const express = require("express")
const BaseController = require("../controllers/baseController")

class BaseRouter {
    model

    constructor(model) {
        this.model = model
        this.router = new express.Router()
        this.baseController = new BaseController(model)

        this.router.post("/", this.baseController.create.bind(this))
        this.router.get("/", this.baseController.findAll.bind(this))
        this.router.get("/:id", this.baseController.findOne.bind(this))
        this.router.put("/:id", this.baseController.update.bind(this))
        this.router.delete("/:id", this.baseController.remove.bind(this))
    }
}

module.exports = BaseRouter