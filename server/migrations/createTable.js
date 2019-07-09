/* eslint-disable no-console */
import pool from '../model/db';

pool.on('connect', () => {
  console.log('Connected to the database');
});

const queryText = `CREATE TYPE action AS ENUM
  ('Active', 'Cancelled', 'Ended');
  
  CREATE TABLE users
  (
      id SERIAL NOT NULL,
      user_id VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL,
      first_name VARCHAR(128) NOT NULL,
      last_name VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      img VARCHAR(128),
      is_admin BOOLEAN NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      PRIMARY KEY(id, user_id),
      UNIQUE (user_id)
  );
  
  CREATE TABLE bus
  (
      id SERIAL NOT NULL,
      bus_id VARCHAR(128) NOT NULL,
      user_id VARCHAR(128),
      number_plate VARCHAR(128) NOT NULL,
      manufacturer VARCHAR(128) NOT NULL,
      model VARCHAR(128) NOT NULL,
      year INT NOT NULL,
      capacity INT NOT NULL,
      color VARCHAR(128),
      img VARCHAR(500),
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(user_id),
      PRIMARY KEY(id, bus_id),
      UNIQUE (bus_id)
  );
  
  CREATE TABLE trip
  (
      id SERIAL NOT NULL,
      trip_id VARCHAR(128) NOT NULL,
      user_id VARCHAR(128) REFERENCES users(user_id) NOT NULL,
      bus_id VARCHAR(128) REFERENCES bus(bus_id) NOT NULL,
      origin VARCHAR(500) NOT NULL,
      destination VARCHAR(500) NOT NULL,
      trip_date DATE NOT NULL,
      trip_time TIME NOT NULL,
      fare VARCHAR(128) NOT NULL,
      status action default 'Active',
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      PRIMARY KEY(id, trip_id),
      UNIQUE (trip_id)
  );
  
  CREATE TABLE booking
  (
      id SERIAL NOT NULL,
      booking_id VARCHAR(128) NOT NULL,
      trip_id VARCHAR(128) REFERENCES trip(trip_id) NOT NULL,
      user_id VARCHAR(128) REFERENCES users(user_id) NOT NULL,
      seat_number INT,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      PRIMARY KEY(id, booking_id)
  );`;

pool
  .query(queryText)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
