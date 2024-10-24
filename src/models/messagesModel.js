import Joi from 'joi'
import { GET_DB } from '../configs/mongoDB.js'
import { ObjectId } from 'mongodb'

const MESSAGES_COLLECTION_NAME = 'messages'
const MESSAGES_COLLECTION_SCHEMA = Joi.object({
  roomId: Joi.string().required(),
  userId: Joi.string().required(),
  message: Joi.object({
    content: Joi.string().required().min(2).max(256),
    type: Joi.string().valid('text', 'image').default('text'),
  }),
  createAt: Joi.date().default(() => Date.now())
})

const validateBeforeCreate = async (data) => {
  return await MESSAGES_COLLECTION_SCHEMA.validateAsync(data)
}

export const messagesModel = {
  createNewMessage: async (data) => {
    const valiData = await validateBeforeCreate(data)
    return await GET_DB().collection(MESSAGES_COLLECTION_NAME).insertOne(valiData)
  },
  getMessagesByRoomId: async (roomId, page) => {
    const limit = 16
    const skip = (page - 1) * limit
    return await GET_DB().collection(MESSAGES_COLLECTION_NAME).find({ roomId: roomId }).sort({ createAt: -1 }).skip(skip).limit(limit).toArray()
  },
  findMessageById: async (messageId) => {
    return await GET_DB().collection(MESSAGES_COLLECTION_NAME).findOne({ _id: ObjectId.createFromHexString(messageId) })
  },
  getLatestMessageByRoomId: async (roomId) => {
    return await GET_DB().collection(MESSAGES_COLLECTION_NAME).find({ roomId: roomId }).sort({ createAt: -1 }).limit(1).toArray()
  }
}
