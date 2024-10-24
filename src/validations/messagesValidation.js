import Joi from 'joi'
import { imageSchema } from './upLoadImgValidation.js'

export const messagesValidation = async (req, res, next) => {
  const messageSchema = Joi.object({
    content: Joi.string(),
  })

  try {
    if(req.file) {
      await imageSchema.validateAsync(req.file)
    }
    await messageSchema.validateAsync(req.body)
    next()
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Validation Messages Error: ' + error?.details[0]?.message })
  }
}
