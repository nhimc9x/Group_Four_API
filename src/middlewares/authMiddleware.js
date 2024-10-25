import { env } from '../configs/environment.js'
import jwtProvider from '../providers/jwtProvider.js'

export const authMiddleware = {
  isAuthorized: async (req, res, next) => {
    const accesssTokenFromHeader = req.headers.authorization
    if (!accesssTokenFromHeader) {
      res.status(401).json({ message: 'UNAUTHORIZED! Không có token' })
      return
    }
    try {
      const accesssTokenDecoded = await jwtProvider.verifyToken(
        accesssTokenFromHeader.replace('Bearer ', ''),
        env.ACCESS_TOKEN_SECRET_SIGNATURE
      )
      console.log('accesssTokenDecoded: ', accesssTokenDecoded)
      req.jwtDecoded = accesssTokenDecoded
      next()
    } catch (error) {
      res.status(401).json({ message: 'UNAUTHORIZED! Vui lòng đăng nhập' })
    }
  }
}