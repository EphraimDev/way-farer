import pg from 'pg';
import config from '../config/db';

// Create configurations for database
const devConfig = {
  database: config.development.database,
  host: config.development.host,
  user: config.development.username,
  password: config.development.password,
  port: 5432,
};

const prodConfig = process.env.DATABASE_URL;

const dbConfig = (process.env.NODE_ENV === 'production') ? prodConfig : devConfig;

const testConfig = {
  database: config.test.database,
  host: config.test.host,
  user: config.test.username,
  password: config.test.password,
  port: 5432,
};

const pool = (process.env.NODE_ENV === 'test') ? new pg.Pool(testConfig) : new pg.Pool(dbConfig);



pool.on('connect', () => {
  console.log('connected to the Database');
});

export default pool;
