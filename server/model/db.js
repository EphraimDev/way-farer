/* eslint-disable no-console */
import pg from 'pg';
import config from '../config/db';

// Create configurations for database
const dbConfig = {
  database: config.db.database,
  host: config.db.host,
  user: config.db.username,
  password: config.db.password,
  port: 5432,
};

const prodConfig = process.env.DATABASE_URL;

const pool = (process.env.NODE_ENV === 'production') ? new pg.Pool({ connectionString: prodConfig }) : new pg.Pool(dbConfig);


pool.on('connect', () => {
  console.log('connected to the Database');
});

export default pool;
