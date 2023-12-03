const mongoose = require("mongoose")
const { messageType } = require("../constants/constants")
const { validations, validationsText } = require("../constants/constants")

const chatsSchema = new mongoose.Schema({
    isGroupChat: {
        type: Boolean,
        default: false
    },
    groupName: {
        type: String,
        required: false,
        minLength: [validations.groupNameMin, validationsText.groupNameMin],
        maxLength: [validations.groupNameMax, validationsText.groupNameMax],
    },
    groupImage: {
        type: String,
        required: false
    },
    groupDescription: {
        type: String,
        required: false,
        maxLength: [validations.groupDescriptionMax, validationsText.groupDescriptionMax]
    },
    groupAdmins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false
    }],
    blockedStatuses: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        }
    }],
    readStatuses: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: false
        },
        isRead: {
            type: Boolean,
            default: false
        }
    }],
    deletedStatuses: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }],
    deletedMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
        required: false
    }],
    lastMessageDeleted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
        required: false
    },
    unReadCount: {
        type: Number,
        default: 0
    },
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, validationsText.userIdsRequired]
    }],
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    messageType: {
        type: Number,
        enum: [messageType.audio, messageType.doc, messageType.image, messageType.text, messageType.video, messageType.startChat],
        required: [true, validationsText.messageTypeRequired]
    },
    lastMessage: {
        type: String,
        default: ""
    },
}, { timestamps: true })

const Chats = mongoose.model("Chats", chatsSchema)
module.exports = Chats