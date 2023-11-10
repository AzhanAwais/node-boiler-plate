const CustomError = require("../services/customError")

class BaseController {
    constructor(model, validationSchema, populateFields) {
        this.model = model
        this.validationSchema = validationSchema
        this.populateFields = populateFields
    }

    async createOne(req, res, next) {
        try {
            const { error } = this.validationSchema.validate(req.body)
            if (error) {
                next(error)
            }
            const data = await this.model.create(req.body)
            res.status(201).send({ data, message: "Record created successfully" })
        }
        catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const deleteFromQuery = ["paginate", "page", "perPage", "sort", "sortBy"]
            let data = []
            let pagination = null
            const query = req.query
            const findQuery = { ...req.query }

            for (const key in findQuery) {
                if (deleteFromQuery.includes(key)) {
                    delete findQuery[key]
                }
            }

            const sortOrder = query.sort == 'asc' ? 1 : -1
            const sort = sortOrder || 1
            const sortBy = query.sortBy || "createdAt"

            const queryBuilder = this.model.find(findQuery).sort({ [sortBy]: sort })

            if (query.paginate) {
                const page = parseInt(query.page) || 1
                const perPage = parseInt(query.perPage) || 10
                const skip = (page - 1) * perPage

                queryBuilder.skip(skip).limit(perPage)

                const totalRecords = await this.model.countDocuments()
                const totalPages = Math.ceil(totalRecords / perPage)
                pagination = { page, perPage, totalRecords, totalPages }
            }

            if (this.populateFields.length > 0) {
                queryBuilder.populate(this.populateFields)
            }

            data = await queryBuilder.exec()

            res.status(200).send({
                message: "Record fetch successfully",
                data: data,
                ...(pagination && { pagination }),
            })
        }
        catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const data = await this.model.findById({ _id: id })
            res.status(200).send({
                message: "Record fetch successfully",
                data,
            })
        }
        catch (e) {
            next(e)
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const data = await this.model.findByIdAndUpdate({ _id: id }, req.body, { new: true })
            if (!data) {
                return next(new CustomError(404, "Record not found"))
            }

            res.status(200).send({
                message: "Record updated successfully",
                data,
            })
        }
        catch (e) {
            next(e)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const data = await this.model.findByIdAndDelete({ _id: id })
            if (!data) {
                return next(new CustomError(404, "Record not found"))
            }

            res.status(200).send({
                message: "Record deleted successfully",
                data,
            })
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = BaseController