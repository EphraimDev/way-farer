import dotenv from 'dotenv';

dotenv.config();

const config = {
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE,
    host: process.env.PROD_HOST,
    url: process.env.PROD_DATABASE_URL,
  },
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    url: process.env.DEV_DATABASE_URL,
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASS,
    database: process.env.TEST_DATABASE,
    name: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
  },
  jwtSecret: process.env.JWT_KEY,

  mail: {
    smtpConfig: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.email, // fortestingprojects2018@gmail.com',
        pass: process.env.password, // 'fortests@gmail.com',
      },
    },
  },

};
export default config;