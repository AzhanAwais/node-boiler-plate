const mongoose = require("mongoose")
const { messageType } = require("../constants/constants")
const { validations, validationsText } = require("../constants/constants")

const messagesSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, validationsText.senderRequried]
    },
    messageType: {
        type: Number,
        enum: [messageType.audio, messageType.doc, messageType.image, messageType.text, messageType.video, messageType.startChat],
        required: [true, validationsText.messageTypeRequired]
    },
    message: {
        type: String,
        default: ""
    },
    images: [
        {
            type: String
        }
    ],
    videos: [
        {
            type: String
        }
    ],
    audio: {
        type: String
    },
    docs: [{
        name: {
            type: String
        },
        url: {
            type: String
        },
    }]

}, { timestamps: true })

const Messages = mongoose.model("Messages", messagesSchema)
module.exports = Messages