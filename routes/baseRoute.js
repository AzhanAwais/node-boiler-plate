const express = require("express")
const BaseController = require("../controllers/baseController")
const authMiddleware = require("../middlewares/authMiddleware")

class BaseRoute {
    constructor(model, validationSchema, routeName) {
        this.model = model
        this.validationSchema = validationSchema
        this.routeName = routeName
        this.router = new express.Router()
        this.baseController = new BaseController(this.model, this.validationSchema)

        this.router.post(`/${this.routeName}`, this.baseController.create.bind(this))
        this.router.get(`/${this.routeName}`, this.baseController.findAll.bind(this))
        this.router.get(`/${this.routeName}/:id`, this.baseController.findOne.bind(this))
        this.router.put(`/${this.routeName}/:id`, this.baseController.update.bind(this))
        this.router.delete(`/${this.routeName}/:id`, this.baseController.remove.bind(this))
    }
}

module.exports = BaseRoute