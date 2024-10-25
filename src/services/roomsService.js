import { uploadImages } from '../configs/cloudinary.js'
import { messagesModel } from '../models/messagesModel.js'
import { roomsModel } from '../models/roomsModel.js'

export const roomsService = {
  createNewRoom: async (ownerInfo, roomName, avatarRoom) => {
    const roomData = {
      members: [{
        userId: ownerInfo.id,
        userName: ownerInfo.username
      }],
      roomName: roomName,
    }
    if (avatarRoom) {
      const avatarRoomUrl = await uploadImages(avatarRoom.path)
      roomData.avatarRoom = avatarRoomUrl
      console.log('url: ', avatarRoomUrl)
    }
    try {
      const createdRoom = await roomsModel.createNewRoom(roomData)
      return roomsModel.findRoomByID(createdRoom.insertedId.toString())
    } catch (error) {
      throw error
    }
  },
  findRoomsByID: async (roomId) => {
    try {
      if (!roomId) {
        throw new Error('Chưa có ID phòng')
      }
      return await roomsModel.findRoomByID(roomId)
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  getRoomsByUserId: async (userId) => {
    try {
      const rooms = await roomsModel.getRoomsByUserId(userId)

      return await Promise.all(rooms.map( async (room) => {
        const latestMessage = await messagesModel.getLatestMessageByRoomId(room._id.toString())
        return {
          ...room,
          latestMessage: {
           ...latestMessage[0]
          }
        }
      }))
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
