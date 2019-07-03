CREATE TYPE action AS ENUM
('Active', 'Cancelled', 'Ended');

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    img VARCHAR(128),
    is_admin BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE bus
(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users(id) NOT NULL,
    number_plate VARCHAR(128) NOT NULL,
    manufacturer VARCHAR(128) NOT NULL,
    model VARCHAR(128) NOT NULL,
    year INT NOT NULL,
    capacity INT NOT NULL,
    color VARCHAR(128),
    img VARCHAR(500),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE trip
(
    id SERIAL PRIMARY KEY,
    bus_id SERIAL REFERENCES bus(id) NOT NULL,
    origin VARCHAR(500) NOT NULL,
    destination VARCHAR(500) NOT NULL,
    trip_date DATE NOT NULL,
    trip_time TIME NOT NULL,
    fare VARCHAR(128) NOT NULL,
    status action default 'Active',
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE booking
(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users(id) NOT NULL,
    trip_id SERIAL REFERENCES trip(id) NOT NULL,
    seat_number INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);