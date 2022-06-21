require('dotenv').config();
import cloudinary from 'cloudinary';
// const MONGO_URL = process.env.MONGO_URL;
const secret = process.env.SECRET_KEY;
const MONGO_URL =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGO_URL;
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure_distribution: 'api - eu.cloudinary.com',
// });
export default { secret, MONGO_URL, cloudinary };
