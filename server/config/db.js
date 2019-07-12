import dotenv from 'dotenv';

dotenv.config();

const config = {
  db: {
    username: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_USER : process.env.DEV_USERNAME,
    password: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_PASS : process.env.DEV_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_DATABASE : process.env.DEV_DATABASE,
    host: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_HOST : process.env.DEV_HOST,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  jwtSecret: process.env.JWT_KEY,

  mail: {
    smtpConfig: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    },
  },

};
export default config;
