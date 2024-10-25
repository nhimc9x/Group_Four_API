import express from 'express'
import { usersRoute } from './usersRoute.js'
import { roomsRoute } from './roomsRoute.js'
import { messagesRoute } from './messagesRoute.js'

const Router = express.Router()

Router.get('/', (req, res) => {
  res.json({
    status: 'OKE',
    messages: 'APIs V1 are ready',
    author: 'Nhóm 4',
  })
})

Router.use('/users', usersRoute)

Router.use('/rooms', roomsRoute)

Router.use('/messages', messagesRoute)

export const apis_v1 = Router
