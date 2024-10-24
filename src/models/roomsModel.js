import Joi from 'joi'
import { GET_DB } from '../configs/mongoDB.js'
import { ObjectId } from 'mongodb'

const ROOM_COLLECTION_NAME = 'rooms'
const PLACEHOLDER_ROOM_AVATAR = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBEUwRMzflTzBslK6ztuejVZQ-wMj-BJLRkLrpjqo3HRYW1vDLwMfuuVmNDAdjBfBbBNg&usqp=CAU'

const ROOM_COLLECTION_SCHEMA = Joi.object({
  roomName: Joi.string().required().min(3).max(64),
  members: Joi.array().items(Joi.object({
    userId: Joi.string(),
    userName: Joi.string()
  })).default([]),
  avatarRoom: Joi.string().default(PLACEHOLDER_ROOM_AVATAR),
  createAt: Joi.date().default(() => Date.now())
})

const validateBeforeCreate = async (data) => {
  return await ROOM_COLLECTION_SCHEMA.validateAsync(data)
}

export const roomsModel = {
  createNewRoom: async (data) => {  
    const valiData = await validateBeforeCreate(data)
    return await GET_DB().collection(ROOM_COLLECTION_NAME).insertOne(valiData)
  },
  findRoomByID: async (roomId) => {
    return await GET_DB().collection(ROOM_COLLECTION_NAME).findOne({ _id: ObjectId.createFromHexString(roomId) })
  },
  getRoomsByUserId: async (userId) => {
    return await GET_DB().collection(ROOM_COLLECTION_NAME).find({ 'members.userId': userId }).toArray()
  } 
}