import Joi from 'joi'
import { GET_DB } from '../configs/mongoDB.js'
import { ObjectId } from 'mongodb'

const USER_COLLECTION_NAME = 'users'
const PLACEHOLDER_USER_AVATAR = 'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'

const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().min(3).max(32),
  password: Joi.string().required(),
  email: Joi.string().required().pattern(new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$', 'i')),
  avatar: Joi.string().default(PLACEHOLDER_USER_AVATAR),
  createAt: Joi.date().default(() => Date.now())
})

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data)
}

export const usersModel = {
  createNewUser: async (data) => {  
    const valiData = await validateBeforeCreate(data)
    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(valiData)
  },
  findUserByEmail: async (email) => {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      email: email,
    })
  },
  findUserByID: async (userId) => {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: ObjectId.createFromHexString(userId) })
  },
  search: async (q) => {
    return await GET_DB().collection(USER_COLLECTION_NAME).find({
      $or: [
        { username: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    }).toArray()
  }
}