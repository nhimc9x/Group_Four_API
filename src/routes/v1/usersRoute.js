import express from 'express'
import { usersValidation } from '../../validations/usersValidation.js'
import { usersController } from '../../controllers/usersController.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const Router = express.Router()

Router.post('/login', usersController.login)

Router.post('/signup', usersValidation, usersController.signup)

Router.get('/verify_token', authMiddleware.isAuthorized, usersController.verifyToken)

export const usersRoute = Router
