import express from 'express'
import { roomsValidation } from '../../validations/roomsValidation.js'
import { roomsController } from '../../controllers/roomsController.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import { upload } from '../../middlewares/multerMiddleware.js'

const Router = express.Router()

Router.get('/get_all', authMiddleware.isAuthorized, roomsController.getRoomsByUserId)

Router.post('/create', authMiddleware.isAuthorized, upload.single('image'), roomsValidation, roomsController.createNewRooms)

Router.get('/detail/:roomId', roomsController.getRoom)

Router.put('/join/:roomId', authMiddleware.isAuthorized, roomsController.joinRoom)

Router.put('/leave/:roomId', authMiddleware.isAuthorized, roomsController.leaveRoom)

export const roomsRoute = Router
