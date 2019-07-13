/* eslint-disable no-console */
import pool from '../model/db';

pool.on('connect', () => {
  console.log('Connected to the database');
});

const queryText = `DROP TABLE IF EXISTS booking, trip, bus, users CASCADE;

  DROP TYPE IF EXISTS action;

  CREATE TYPE action AS ENUM
  ('Active', 'Cancelled', 'Ended');
  
  CREATE TABLE users
  (
      user_id SERIAL NOT NULL,
      email VARCHAR(128) NOT NULL,
      first_name VARCHAR(128) NOT NULL,
      last_name VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      img VARCHAR(500),
      is_admin BOOLEAN NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      PRIMARY KEY(user_id)
  );
  
  CREATE TABLE bus
  (
      bus_id SERIAL NOT NULL,
      user_id INT REFERENCES users(user_id) NOT NULL,
      number_plate VARCHAR(128) NOT NULL,
      manufacturer VARCHAR(128) NOT NULL,
      model VARCHAR(128) NOT NULL,
      year INT NOT NULL,
      capacity INT NOT NULL,
      color VARCHAR(128),
      img VARCHAR(500),
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      PRIMARY KEY(bus_id)
  );
  
  CREATE TABLE trip
  (
      trip_id SERIAL NOT NULL,
      user_id INT REFERENCES users(user_id) NOT NULL,
      bus_id INT REFERENCES bus(bus_id) NOT NULL,
      origin VARCHAR(500) NOT NULL,
      destination VARCHAR(500) NOT NULL,
      trip_date DATE NOT NULL,
      trip_time TIME NOT NULL,
      fare VARCHAR(128) NOT NULL,
      status action default 'Active',
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      PRIMARY KEY(trip_id)
  );
  
  CREATE TABLE booking
  (
      booking_id SERIAL NOT NULL,
      trip_id INT REFERENCES trip(trip_id) NOT NULL,
      user_id INT REFERENCES users(user_id) NOT NULL,
      seat_number INT,
      deleted BOOLEAN DEFAULT '0',
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP,
      PRIMARY KEY(booking_id)
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

  
