const express = require("express")
const BaseController = require("../controllers/baseController")
const authMiddleware = require("../middlewares/authMiddleware")

class BaseRoute {
    constructor(model, validationSchema, populateFields, routeName) {
        this.model = model
        this.validationSchema = validationSchema
        this.routeName = routeName
        this.populateFields = populateFields
        this.router = new express.Router()
        this.baseController = new BaseController(this.model, this.validationSchema, this.populateFields)

        this.router.post(`/${this.routeName}`, authMiddleware, this.baseController.createOne.bind(this))
        this.router.get(`/${this.routeName}`, authMiddleware, this.baseController.getAll.bind(this))
        this.router.get(`/${this.routeName}/:id`, authMiddleware, this.baseController.getOne.bind(this))
        this.router.put(`/${this.routeName}/:id`, authMiddleware, this.baseController.updateOne.bind(this))
        this.router.delete(`/${this.routeName}/:id`, authMiddleware, this.baseController.deleteOne.bind(this))
    }
}

module.exports = BaseRoute