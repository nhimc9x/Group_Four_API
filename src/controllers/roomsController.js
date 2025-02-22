import { roomsService } from '../services/roomsService.js'

export const roomsController = {
  createNewRooms: async (req, res) => {

    // console.log("FILE: ", req.file)
    // console.log("11",req.jwtDecoded)
    try {
      const result = await roomsService.createNewRoom(req.jwtDecoded, req.body.roomName, req.file)
      res.status(200).json({ message: 'Tạo phòng thành công', data: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Tao phòng lỗi', message: error.message })
    }
  },
  getRoom: async (req, res) => {
    try {
      const { roomId } = req.params
      const result = await roomsService.findRoomsByID(roomId)
      result ? res.status(200).json({ message: 'Tìm phòng thành công', data: result }) : res.status(200).json({ message: 'Không tìm thấy phòng' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Tìm phòng lỗi', message: error.message })
    }
  },
  getRoomsByUserId: async (req, res) => {
    try {
      const result = await roomsService.getRoomsByUserId(req.jwtDecoded.id)
      res.status(200).json({ message: 'Lấy dữ liệu phòng thành công', data: result })
    } catch (error) {
      res.status(500).json({ error: 'Lấy phòng lỗi', message: error.message })
    }
  }
}
