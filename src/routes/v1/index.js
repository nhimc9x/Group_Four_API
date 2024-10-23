import express from 'express'

const Router = express.Router()

Router.get('/', (req, res) => {
  res.json({
    status: 'OKE',
    messages: 'APIs V1 are ready',
    author: 'Nhóm 4',
  })
})


export const apis_v1 = Router
