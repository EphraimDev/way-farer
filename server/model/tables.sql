CREATE TYPE action AS ENUM ('Active', 'Cancelled', 'Started', 'Ended');

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    is_admin VARCHAR(5) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE bus
(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users(id) NOT NULL,
    number_plate VARCHAR(128) NOT NULL,
    manufacturer INT NOT NULL,
    model VARCHAR(128) NOT NULL,
    year VARCHAR(128) NOT NULL,
    capacity VARCHAR(128) NOT NULL,
    color VARCHAR(128),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE trip
(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users(id) NOT NULL,
    bus_id SERIAL REFERENCES bus(id) NOT NULL,
    origin VARCHAR(128) NOT NULL,
    destination INT NOT NULL,
    trip_date VARCHAR(50) NOT NULL,
    trip_time VARCHAR(50) NOT NULL,
    fare VARCHAR(128) NOT NULL,
    status action default 'Active',
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE booking(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users(id) NOT NULL,
    trip_id SERIAL REFERENCES trip(id) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);