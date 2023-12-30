const mongoose = require("mongoose")
const { messageTypes } = require("../constants/constants")
const Chats = require("../models/Chats")
const Messages = require("../models/Messages")
const CustomError = require("./customError")
const Users = require("../models/Users")
const PaginationService = require("./paginationService")

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
            userIds: { $all: userIds.map(id => new mongoose.Types.ObjectId(id)) }
        }).populate("sender receiver", "-otp -password")

        return chat
    }

    async createChat(userIds, sender, receiver) {
        const chat = new Chats({
            blockedStatuses: userIds.map((item) => ({ user: item, isBlocked: false })),
            readStatuses: userIds.map((item) => ({ user: item, isRead: false })),
            deletedMessages: userIds.map((item) => ({ message: null, user: item })),
            unReadCount: userIds.map((item) => ({ count: 0, user: item })),
            userIds: userIds,
            sender: sender,
            receiver: receiver,
            messageType: 1,
            lastMessage: "No message yet",
        })
        await chat.save()
        await chat.populate('blockedStatuses readStatuses deletedMessages sender receiver', '-otp -password');
        return chat
    }

    async createGroup(currUser, groupName, groupDescription, groupImage, userIds) {
        const chat = new Chats({
            blockedStatuses: userIds.map((item) => ({ user: item, isBlocked: false })),
            readStatuses: userIds.map((item) => ({ user: item, isRead: false })),
            deletedMessages: userIds.map((item) => ({ message: null, user: item })),
            unReadCount: userIds.map((item) => ({ count: 0, user: item })),
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
        await chat.populate('blockedStatuses readStatuses deletedMessages sender receiver', '-otp -password');
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
        await message.populate("sender receiver chatId", '-otp -password')
        await Chats.findByIdAndUpdate(
            { _id: chatId },
            {
                sender: currUser._id,
                receiver: receiver,
                messageType: messageType,
                lastMessage: this.getLastMessageByMessageType(messageType, messageData),
                $inc: { 'unReadCount.$[elem].count': 1 },
                $set: { 'readStatuses.$[elem].isRead': false },
            },
            {
                new: true,
                arrayFilters: [{ 'elem.user': { $ne: currUser._id } }],
            }
        )

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

    async markAllMsgsAsRead(chatId, currUser) {
        const chat = await Chats.findByIdAndUpdate(
            { _id: chatId },
            {
                $set: {
                    'unReadCount.$[elem].count': 0,
                    'readStatuses.$[elem].isRead': true,
                }
            },
            {
                new: true,
                arrayFilters: [{ 'elem.user': { $eq: currUser._id } }]
            }
        )
    }

    async deleteChat(chatId, currUser) {
        const [lastMessage] = await Messages.find({ chatId: chatId }).sort({ updatedAt: -1 })
        const chat = await Chats.findByIdAndUpdate(
            {
                _id: chatId
            },
            {
                $set: {
                    'deletedMessages.$[elem].message': lastMessage._id,
                }
            },
            {
                new: true,
                arrayFilters: [{ 'elem.user': { $eq: currUser._id } }]
            }
        )

        if (!chat) {
            throw new CustomError(400, `Invalid chatId. No chat found`)
        }

        return chat
    }

    async blockUser(userIds, userId) {

        const chat = await Chats.findOneAndUpdate(
            {
                isGroupChat: false,
                userIds: { $all: userIds.map(id => new mongoose.Types.ObjectId(id)) },
            },
            {
                $set: {
                    'blockedStatuses.$[elem].isBlocked': true,
                }
            },
            {
                new: true,
                arrayFilters: [{ 'elem.user': { $eq: userId } }]
            }
        ).populate('sender receiver', '-otp -password')

        if (!chat) {
            throw new CustomError(400, `No chat found between these users`)
        }

        return chat
    }

    async unblockUser(userIds, userId) {

        const chat = await Chats.findOneAndUpdate(
            {
                isGroupChat: false,
                userIds: { $all: userIds.map(id => new mongoose.Types.ObjectId(id)) },
            },
            {
                $set: {
                    'blockedStatuses.$[elem].isBlocked': false,
                }
            },
            {
                new: true,
                arrayFilters: [{ 'elem.user': { $eq: userId } }]
            }
        ).populate('sender receiver', '-otp -password')

        if (!chat) {
            throw new CustomError(400, `No chat found between these users`)
        }

        return chat
    }

    async getMessages(chatId, currUser) {
        let messages = []
        const chat = await Chats.findById({ _id: chatId }).populate('deletedMessages.message')
        if (!chat) {
            throw new CustomError(400, `No chat found between these users`)
        }
        const [deletedMessage] = chat.deletedMessages.filter((item) => item.user.toString() == currUser._id.toString())
        if (deletedMessage.message) {
            messages = await Messages.find({ chatId: chatId, createdAt: { $gt: deletedMessage.message.createdAt } }).sort({ updatedAt: 1 }).populate("sender receiver chatId", '-otp -password')
            return messages
        }
        messages = await Messages.find({ chatId: chatId }).sort({ updatedAt: 1 }).populate("sender receiver chatId", '-otp -password')
        return messages
    }

    async getChatUsers(currUser) {
        const chatUsers = await Chats.find({
            userIds: { $in: [currUser._id] }
        }).populate("sender receiver", '-otp -password').sort({ createdAt: -1 })

        return chatUsers
    }

    async searchUsers(currUser, query) {
        let populateFields = []
        let projection = { password: 0, otp: 0 }
        let findQuery = {
            ...query,
            _id: { $nin: [currUser?._id] },
            isDeleted: false,
        }
        delete findQuery.search

        if (query.search) {
            const queryString = new RegExp(query.search, 'i');
            findQuery = {
                ...findQuery,
                $or: [
                    { fullname: queryString },
                    { email: queryString },
                    { phone: queryString }
                ],
            }
        }
        const paginationService = new PaginationService(Users)
        const users = await paginationService.addPagination(findQuery, populateFields, projection)
        return users
    }

    async updateUserOnlineStatus(userId, status) {
        const user = await Users.findByIdAndUpdate({ _id: userId }, { isOnline: status }, { new: true })
        if (!user) {
            throw new CustomError(400, `No user found`)
        }
        return user
    }
}

module.exports = new ChatService()