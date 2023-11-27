class PaginationService {
    constructor(model) {
        this.model = model
    }

    async addPagination(query = {}, populateFields = []) {
        let data = []
        let pagination = null
        const findQuery = this.getFindQuery(query)

        const sortOrder = query.sort == 'asc' ? 1 : -1
        const sort = sortOrder || 1
        const sortBy = query.sortBy || "createdAt"

        let queryBuilder = this.model.find(findQuery).sort({ [sortBy]: sort })

        if (query.paginate) {
            const page = parseInt(query.page) || 1
            const perPage = parseInt(query.perPage) || 10
            const skip = (page - 1) * perPage

            queryBuilder.skip(skip).limit(perPage)

            const totalRecords = await this.model.countDocuments()
            const totalPages = Math.ceil(totalRecords / perPage)
            pagination = { page, perPage, totalRecords, totalPages }
        }

        if (populateFields.length > 0) {
            queryBuilder.populate(populateFields)
        }

        data = await queryBuilder.exec()

        return {
            data,
            pagination
        }
    }

    getFindQuery(query = {}) {
        const findQuery = { ...query }
        const deleteFromFindQuery = ["paginate", "page", "perPage", "sort", "sortBy"]

        for (const key in findQuery) {
            if (deleteFromFindQuery.includes(key)) {
                delete findQuery[key]
            }
        }

        return findQuery
    }
}

module.exports = PaginationService
