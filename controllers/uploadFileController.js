const uploadFileSchema = require("../schemas/uploadFileSchema")
const { APP_URL } = require("../config/index")

class UploadFileController {
    async uploadFile(req, res, next) {
        try {
            const { error } = uploadFileSchema.validate({ file: req.file })
            if (error) {
                next(error)
            }
            const fileUrl = `${APP_URL}/uploads/${req.file.filename}`

            res.status(201).send({
                message: "File uploaded successfully",
                data: fileUrl
            })
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = UploadFileController