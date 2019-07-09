import cloudinary from 'cloudinary';
import config from '../config/db';

const upload = async (req) => {
  try {
    cloudinary.config({
      cloud_name: config.cloudinary.cloud_name,
      api_key: config.cloudinary.api_key,
      api_secret: config.cloudinary.api_secret,
    });

    const result = await cloudinary.uploader.upload(req.file.path);
    
    req.body.imageId = result.public_id;
    req.body.imageURL = result.secure_url;
  } catch (err) {
    return false;
  }

  return req.body;
};

export default upload;