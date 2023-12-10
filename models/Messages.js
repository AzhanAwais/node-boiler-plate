const mongoose = require("mongoose")
const { messageType, messageTypesEnum } = require("../constants/constants")
const { validations, validationsText } = require("../constants/constants")

const messagesSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chats",
        required: [true, validationsText.chatIdRequired]
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, validationsText.senderRequried]
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, validationsText.senderRequried]
    },
    messageType: {
        type: Number,
        enum: messageTypesEnum,
        required: [true, validationsText.messageTypeRequired]
    },
    message: {
        type: String,
        default: null
    },
    images: [
        {
            type: String,
            default: null
        }
    ],
    videos: [
        {
            type: String,
            default: null
        }
    ],
    audio: {
        type: String,
        default: null
    },
    docs: [{
        name: {
            type: String
        },
        url: {
            type: String
        },
    }],
    isDeleted: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true })

const Messages = mongoose.model("Messages", messagesSchema)
module.exports = Messages