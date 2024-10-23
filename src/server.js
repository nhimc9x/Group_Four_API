import express from 'express'
import exitHook from 'async-exit-hook'
import { env } from './configs/environment.js'
import cors from 'cors'
import { CLOSE_DB, CONNECT_DB } from './configs/mongoDb.js'
import { apis_v1 } from './routes/v1/index.js'

const START_SERVER = () => {
  const app = express()
  app.use(express.json())
  app.use(cors({
    origin: function (origin, callback) {
      return callback(null, true)
    }
  }))

  app.get('/', (req, res) => {
    res.json({
      title: 'APIs Chat App',
      author: 'Nhóm 4'
    })
  })

  app.use('/v1', apis_v1)

  // Handle 404
  app.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Not Found'
    })
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => console.log(`This Server Is Running ${env.APP_HOST}:${env.APP_PORT}`))

  exitHook(() => {
    console.log('Server Is Shutting Down...')
    CLOSE_DB()
  })
}

// Chỉ khi kết nối thành công với MongoDB mới Start Server
(async () => {
  try {
    console.log('Đang kết nối tới MongoDB...')
    await CONNECT_DB()
    console.log('Kết nối MongoDB thành công.')
    START_SERVER()
  } catch (error) {
    console.error('Kết nối lỗi: ', error)
    process.exit(0)
  }
})()