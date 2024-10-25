import { usersModel } from '../models/usersModel.js'
import bcrypt from 'bcrypt'

export const usersService = {

  login: async (reqBody) => {
    try {
      const findUser = await usersModel.findUserByEmail(reqBody.email)
      if (!findUser) {
        throw new Error('Email không tồn tại')
      }
      const matchPassword = await bcrypt.compare(reqBody.password, findUser.password)
      if (!matchPassword) {
        throw new Error('Mật khẩu không đúng')
      }
      return findUser
    } catch (error) {
      throw error
    }
  },

  signup: async (reqBody) => {
    try {
      const hashPassword = await bcrypt.hash(reqBody.password, 10)
      const user = await usersModel.createNewUser({...reqBody, password: hashPassword})
      console.log(user.insertedId)
      return await usersModel.findUserByID(user.insertedId.toString())
    } catch (error) {
      throw error
    }
  },

  findUserByEmail: async (email) => {
    return await usersModel.findUserByEmail(email)
  },
  verifyToken: async (userId) => {
    try {
      const result = await usersModel.findUserByID(userId)
      if (!result) {
        throw new Error('Không tìm thấy user')
      } 
      return result 
    } catch (error) {
      throw error
    }
  }
}
