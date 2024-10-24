import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import { upload } from '../../middlewares/multerMiddleware.js'
import { messagesValidation } from '../../validations/messagesValidation.js'
import { messagesController } from '../../controllers/messagesController.js'

const Router = express.Router()

Router.post('/:roomId', authMiddleware.isAuthorized, upload.single('image'), messagesValidation, messagesController.createNewMessage)

Router.get('/:roomId', authMiddleware.isAuthorized, messagesController.getMessagesByRoomId)

export const messagesRoute = Router
