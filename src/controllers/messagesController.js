import { messagesService } from '../services/messagesService.js'

export const messagesController = {
  createNewMessage: async (req, res) => {
    try {
      const created = await messagesService.createNewMessage(req.jwtDecoded, req.body.content, req.params.roomId, req.file)
      res.status(200).json({ message: 'Gửi tin nhắn thành công', data: created })
    } catch (error) {
      res.status(500).json({ error: 'Gửi tin nhắn lỗi', message: error.message })
    }
  },
  getMessagesByRoomId: async (req, res) => {
    try {
      const roomId = req.params.roomId
      const page = Number(req.query.page) || 1
      const result = await messagesService.getMessagesByRoomId(roomId, page)
      res.status(200).json({ message: 'Lấy tin nhắn trong phòng thành công', data: result })
    } catch (error) {
      res.status(500).json({ error: 'Lấy tin nhắn lỗi', message: error.message })
    }
  }
}
