import { env } from '../configs/environment.js'
import jwtProvider from '../providers/jwtProvider.js'
import { usersService } from '../services/usersService.js'

export const usersController = {
  login: async (req, res) => {
    try {
      const reqBody = {
        email: req.body.email,
        password: req.body.password
      }

      const result = await usersService.login(reqBody)
      const userInfo = {
        id: result._id,
        email: result.email,
        username: result.username,
      }

      const accessToken = await jwtProvider.generateToken(userInfo, env.ACCESS_TOKEN_SECRET_SIGNATURE, '1 days')

      res.status(200).json({ message: 'Đăng nhập thành công', data: { ...userInfo, accessToken } })
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Đăng nhập lỗi', message: error.message })
    }
  },
  signup: async (req, res) => { 
    const reqBody = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }
    try {
      const checkedUser = await usersService.findUserByEmail(reqBody.email)
      if (checkedUser) {
        res.status(400).json({ message: 'Email đã tồn tại' })
        return
      }
      const created = await usersService.signup(reqBody)
      res.status(201).json({ message: 'Đăng ký thành công', data: created })
    } catch (error) {
      res.status(500).json({ error: 'Đăng ký lỗi', message: error.message })
    }
  },
  verifyToken: async (req, res) => {
    try {

      const result = await usersService.verifyToken(req.jwtDecoded.id)
      res.status(200).json({ message: 'Token đã xác thực thành công', data: result })
  
      
    } catch (error) {
      res.status(500).json({ error: 'lỗi', message: error.message })
      
    }
  }
}