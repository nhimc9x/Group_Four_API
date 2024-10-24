import Joi from 'joi'
import { imageSchema } from './upLoadImgValidation.js'

export const roomsValidation = async (req, res, next) => {
  const roomsSchema = Joi.object({
    roomName: Joi.string().required().min(3).max(64)
  })
  try {
    if(req.file) {
      console.log(req.file)
      await imageSchema.validateAsync(req.file)
    }
    await roomsSchema.validateAsync(req.body)
    next()
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Validation Room Error: ' + error?.details[0]?.message })
  }
}
