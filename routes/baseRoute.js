const express = require("express")
const BaseController = require("../controllers/baseController")
const authMiddleware = require("../middlewares/authMiddleware")
const uploadFileMiddleware = require("../middlewares/uploadFileMiddleware")

class BaseRoute {
    constructor(model, validationSchema, populateFields) {
        this.model = model
        this.validationSchema = validationSchema
        this.populateFields = populateFields
        this.router = new express.Router()
        this.baseController = new BaseController(this.model, this.validationSchema, this.populateFields)

        this.router.post(`/`, authMiddleware, this.baseController.createOne.bind(this))
        this.router.post(`/bulk-upload`, authMiddleware, uploadFileMiddleware.single("file"), this.baseController.bulkUpload.bind(this))
        this.router.get(`/`, authMiddleware, this.baseController.getAll.bind(this))
        this.router.get(`/:id`, authMiddleware, this.baseController.getOne.bind(this))
        this.router.put(`/:id`, authMiddleware, this.baseController.updateOne.bind(this))
        this.router.delete(`/:id`, authMiddleware, this.baseController.deleteOne.bind(this))
    }
}

module.exports = BaseRoute