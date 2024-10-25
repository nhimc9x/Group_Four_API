import { uploadImages } from '../configs/cloudinary.js'
import { messagesModel } from '../models/messagesModel.js'
import { usersModel } from '../models/usersModel.js'

export const messagesService = {
  createNewMessage: async (userInfo, contentText, roomId, image) => {
    try {
      const messageData = {
        roomId: roomId,
        userId: userInfo.id,
        message: {
          content: contentText
        }
      }
      if (image) {
        const imageUrl = await uploadImages(image.path)
        messageData.message.content = imageUrl
        messageData.message.type = 'image'
      }

      const createdMessage = await messagesModel.createNewMessage(messageData)
      return await messagesModel.findMessageById(createdMessage.insertedId.toString())
    } catch (error) {
      throw error
    }
  },
  getMessagesByRoomId: async (roomId, page) => {
    try {
      const messages = await messagesModel.getMessagesByRoomId(roomId, page)
      return await Promise.all(messages.map(async (message) => {
        const user = await usersModel.findUserByID(message.userId)
        delete message.userId
        return {
          ...message,
          userInfo: {
            userId: user._id,
            username: user.username,
            avatar: user.avatar
          }
        }
      }))

    } catch (error) {
      throw error
    }
  }
}