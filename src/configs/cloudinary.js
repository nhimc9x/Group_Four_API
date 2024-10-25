import { v2 as cloudinary } from 'cloudinary'
import { env } from './environment.js'

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true
})

export const uploadImages = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      asset_folder: 'Gruop4/RoomsAvatar',
      resource_type: 'image'
    })
    console.log('Upload Image: ', result)
    return result.secure_url
  } catch (error) {
    throw new Error('Upload Image Error!!!')
  }
}
