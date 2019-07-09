import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    url: process.env.DATABASE_URL,
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASS,
    database: process.env.TEST_DB_DATABASE,
    name: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
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
