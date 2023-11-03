class BaseService {
    model

    constructor(model) {
        this.model = model
    }

    async findById(id) {
        try {
            const data = await model.findById(id)
            if (!data) {
                throw new Error(`No ${model} found`)
            }

            return data
        }
        catch (e) {
            throw new Error(e)
        }
    }

}

module.exports = BaseService