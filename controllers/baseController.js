class BaseController {
    model

    constructor(model) {
        this.model = model
    }

    async create(req, res, next) {
        try {
            const data = await this.model.create(req.body)
            res.status(201).send({ data, message: "Record created successfully" })
        }
        catch (e) {
            next(e)
        }
    }

    async findAll(req, res, next) {
        try {
            const data = await this.model.find()
            res.status(200).send({ data, message: "Record fetch successfully" })
        }
        catch (e) {
            next(e)
        }
    }

    async findOne(req, res, next) {
        try {
            const { id } = req.params
            const data = await this.model.findById({ _id: id })
            res.status(200).send({ data, message: "Record fetch successfully" })
        }
        catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const data = await this.model.findOneAndUpdate({ _id: id })
            res.status(200).send({ data, message: "Record updated successfully" })
        }
        catch (e) {
            next(e)
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params
            const data = await this.model.findOneAndDelete({ _id: id })
            res.status(200).send({ data, message: "Record deleted successfully" })
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = BaseController