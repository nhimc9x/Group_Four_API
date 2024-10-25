import JWT from 'jsonwebtoken'

const jwtProvider = {
  generateToken: async (userInfo, secretSignature, tokenLife) => {
    try {
      return JWT.sign(userInfo, secretSignature, { algorithm: 'HS256', expiresIn: tokenLife })
    } catch (error) {
      throw new Error(error)
    }
  },
  verifyToken: async (token, secretSignature) => {
    try {
      return JWT.verify(token, secretSignature)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default jwtProvider
