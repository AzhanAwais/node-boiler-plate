const mongoose = require("mongoose")
const Chats = require("../models/Chats")

class ChatService {

    async isChatAlreadyExists(userIds) {
        const chat = await Chats.findOne({
            isGroupChat: false,
            userIds: { $in: userIds.map(id => new mongoose.Types.ObjectId(id)) }
        })

        return chat
    }

    async createChat(userIds, sender, receiver) {
        const chat = new Chats({
            blockedStatuses: userIds.map((item) => ({ user: item, isBlocked: false })),
            readStatuses: userIds.map((item) => ({ user: item, isRead: false })),
            deletedStatuses: userIds.map((item) => ({ user: item, isDeleted: false })),
            userIds: userIds,
            sender: sender,
            receiver: receiver,
            messageType: 1,
            lastMessage: "No message yet",
        })
        await chat.save()
        await chat.populate('blockedStatuses readStatuses deletedStatuses sender receiver', '-otp -password');
        return chat
    }

}

module.exports = new ChatService()