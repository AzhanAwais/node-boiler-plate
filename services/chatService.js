const mongoose = require("mongoose")
const Chats = require("../models/Chats")
const Messages = require("../models/Messages")
const { messageTypes } = require("../constants/constants")
const CustomError = require("./customError")

class ChatService {

    getLastMessageByMessageType(messageType, messageData) {
        if (messageType == messageTypes.audio) {
            return "Audio"
        }
        else if (messageType == messageTypes.doc) {
            return messageData.docs[0].name
        }
        else if (messageType == messageTypes.image) {
            return `${messageData.message ? messageData.message : "Photo"}`
        }
        else if (messageType == messageTypes.video) {
            return `${messageData.message ? messageData.message : messageData.videos[0]}`
        }
        else if (messageType == messageTypes.text) {
            return messageData.message
        }
    }

    async isChatAlreadyExists(userIds) {
        const chat = await Chats.findOne({
            isGroupChat: false,
            userIds: { $in: userIds.map(id => new mongoose.Types.ObjectId(id)) }
        }).populate("sender receiver", "-otp -password")

        return chat
    }

    async createChat(userIds, sender, receiver) {
        const chat = new Chats({
            blockedStatuses: userIds.map((item) => ({ user: item, isBlocked: false })),
            readStatuses: userIds.map((item) => ({ user: item, isRead: false })),
            deletedStatuses: userIds.map((item) => ({ user: item, isDeleted: false })),
            deletedMessages: userIds.map((item) => ({ message: null, user: item })),
            userIds: userIds,
            sender: sender,
            receiver: receiver,
            messageType: 1,
            lastMessage: "No message yet",
        })
        await chat.save()
        await chat.populate('blockedStatuses readStatuses deletedStatuses deletedMessages lastMessageDeleted sender receiver', '-otp -password');
        return chat
    }

    async createGroup(currUser, groupName, groupDescription, groupImage, userIds) {
        const chat = new Chats({
            blockedStatuses: userIds.map((item) => ({ user: item, isBlocked: false })),
            readStatuses: userIds.map((item) => ({ user: item, isRead: false })),
            deletedStatuses: userIds.map((item) => ({ user: item, isDeleted: false })),
            deletedMessages: userIds.map((item) => ({ message: null, user: item })),
            isGroupChat: true,
            groupAdmins: [currUser._id],
            groupName: groupName,
            groupDescription: groupDescription,
            groupImage: groupImage,
            userIds: userIds,
            messageType: 1,
            lastMessage: "Group created",
        })
        await chat.save()
        await chat.populate('blockedStatuses readStatuses deletedStatuses deletedMessages lastMessageDeleted sender receiver', '-otp -password');
        return chat
    }

    async isChatExists(chatId) {
        const isExists = await Chats.exists({ _id: chatId })
        if (!isExists) {
            throw new CustomError(400, `Invalid chatId. No chat found`)
        }
        return isExists
    }

    async sendMessage(currUser, messageData) {
        const { chatId, receiver, messageType } = messageData
        const message = new Messages({
            sender: currUser._id,
            ...messageData
        })

        await message.save()
        await message.populate("sender", '-otp -password')
        await Chats.findByIdAndUpdate({ _id: chatId }, {
            sender: currUser._id,
            receiver: receiver,
            messageType: messageType,
            lastMessage: this.getLastMessageByMessageType(messageType, messageData),
        }, { new: true })

        return message
    }

    async deleteMessage(id) {
        const message = await Messages.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true })
        if (!message) {
            throw new CustomError(400, `No message found`)
        }
        await Chats.findByIdAndUpdate({ _id: message.chatId }, {
            messageType: messageTypes.text,
            lastMessage: "This message is deleted",
        }, { new: true })

        return message
    }


}

module.exports = new ChatService()