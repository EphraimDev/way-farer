/* eslint-disable no-console */
import pool from '../model/db';

const queryText = 'DROP TABLE IF EXISTS booking trip bus users CASCADE';


pool.query(queryText)
  .then((res) => {
    console.log(res);
    pool.end();
  }).catch((err) => {
    console.log(err);
    pool.end();
  });

pool.on('remove', () => {
  console.log('Client removed');
  process.exit(0);
});
