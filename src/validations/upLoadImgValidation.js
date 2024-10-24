import Joi from 'joi'

export const imageSchema = Joi.object({
  mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif').messages({'any.only': 'Tệp không đúng định dạng'}),
}).unknown(true)
