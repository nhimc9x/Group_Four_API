import Joi from 'joi'

export const usersValidation = async (req, res, next) => {
  const userSchema = Joi.object({
    username: Joi.string().required().min(3).max(32),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9@$!%*#?&]{6,16}$')),
    email: Joi.string().required().pattern(new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$', 'i'))
  })
  
  try {
    await userSchema.validateAsync(req.body)
    next()
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Validation User Error: ' + error?.details[0]?.message })
  }
}
